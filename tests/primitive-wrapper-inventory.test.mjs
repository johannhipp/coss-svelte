import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { primitiveWrapperInventory } from "../packages/coss-svelte/tests/types/primitive-wrapper-inventory.js";

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const componentDirectory = join(repositoryRoot, "packages", "coss-svelte", "src", "components");
const validCompositionModes = new Set(["owned-element", "delegating-element", "structural"]);

function primitiveAliases(source) {
	return new Map(
		[...source.matchAll(/\b([A-Za-z]+)\s+as\s+([A-Za-z]+Primitive)\b/g)].map((match) => [
			match[2],
			match[1],
		])
	);
}

function componentPropSources(source) {
	const aliases = primitiveAliases(source);
	return [
		...new Set(
			[...source.matchAll(/ComponentProps<typeof ([A-Za-z]+Primitive\.[A-Za-z]+)>/g)].map(
				(match) => {
					const [alias, part] = match[1].split(".");
					return `${aliases.get(alias)}.${part}`;
				}
			)
		),
	];
}

function localRefTarget(component, source) {
	const expressions = [
		...new Set(
			[...source.matchAll(/ComponentProps<typeof ([A-Za-z]+Primitive\.[A-Za-z]+)>/g)].map(
				(match) => match[1]
			)
		),
	].filter((expression) => !expression.endsWith(".Portal"));

	if (component === "AutocompleteInput" || component === "ComboboxInput") {
		return "ComboboxPrimitive.Input";
	}
	if (component.endsWith("Popup")) {
		return expressions.find((expression) => /(?:Sub)?Content$/.test(expression));
	}
	return expressions.find((expression) => source.includes(`<${expression}`)) ?? expressions[0];
}

test("every primitive-backed public wrapper has a closed reviewed contract", () => {
	const primitiveFiles = readdirSync(componentDirectory)
		.filter((filename) => filename.endsWith(".svelte"))
		.filter((filename) =>
			readFileSync(join(componentDirectory, filename), "utf8").includes("Primitive.")
		)
		.map((filename) => filename.slice(0, -".svelte".length))
		.sort();
	const inventoryComponents = primitiveWrapperInventory.map(({ component }) => component).sort();

	assert.deepEqual(inventoryComponents, primitiveFiles);
	assert.equal(new Set(inventoryComponents).size, inventoryComponents.length);

	for (const entry of primitiveWrapperInventory) {
		assert.ok(validCompositionModes.has(entry.composition), entry.component);
		assert.ok(entry.propsSources.length > 0, entry.component);

		const source = readFileSync(join(componentDirectory, `${entry.component}.svelte`), "utf8");
		assert.equal(source.includes("NativeProps"), false, entry.component);
		assert.deepEqual(componentPropSources(source), entry.propsSources, entry.component);
		assert.equal(
			/ref\s*=\s*\$bindable/.test(source) &&
				(/bind:ref/.test(source) || /bind:this=\{ref\}/.test(source)),
			entry.forwardsRef,
			entry.component
		);

		if (entry.composition === "delegating-element") {
			assert.equal(source.includes('"child"'), false, entry.component);
		}

		if (entry.forwardsRef) {
			if (entry.refTarget === "a") {
				assert.match(source, /<a[\s\S]*?\bbind:this=\{ref\}/, `${entry.component}: anchor ref`);
				continue;
			}
			const target = entry.refTarget ?? localRefTarget(entry.component, source);
			assert.ok(target, `${entry.component}: missing ref target`);
			const openingTags = [
				...source.matchAll(new RegExp(`<${target.replace(".", "\\.")}(?=[\\s>])[\\s\\S]*?>`, "g")),
			].map((match) => match[0]);
			assert.ok(openingTags.length > 0, `${entry.component}: ${target}`);
			for (const openingTag of openingTags) {
				assert.match(openingTag, /\bbind:ref\b/, `${entry.component}: ${target}`);
			}
		}
	}
});

test("known Bits UI any leaks remain narrow and upgrade-sensitive", () => {
	const exceptions = primitiveWrapperInventory.flatMap((entry) =>
		(entry.upstreamExceptions ?? []).map((exception) => ({
			component: entry.component,
			...exception,
		}))
	);

	assert.deepEqual(
		exceptions.map(({ component, prop, bitsVersion, contract }) => ({
			component,
			prop,
			bitsVersion,
			contract,
		})),
		[
			{ component: "Checkbox", prop: "name", bitsVersion: "2.18.1", contract: "string" },
			{
				component: "CheckboxGroup",
				prop: "name",
				bitsVersion: "2.18.1",
				contract: "string",
			},
			{
				component: "OTPField",
				prop: "onComplete",
				bitsVersion: "2.18.1",
				contract: "(value: string) => void",
			},
			{ component: "Switch", prop: "value", bitsVersion: "2.18.1", contract: "string" },
		]
	);
	for (const exception of exceptions) {
		assert.ok(exception.evidence.length > 20, `${exception.component}.${exception.prop}`);
	}
});
