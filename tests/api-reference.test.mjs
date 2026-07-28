import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

import { apiContracts } from "../apps/www/src/lib/docs/api-contracts.js";
import { componentApiReference } from "../apps/www/src/lib/docs/api-reference.generated.js";
import { createComponentMarkdown } from "../apps/www/src/lib/docs/markdown.js";
import { componentMetadata, componentParts } from "../packages/coss-svelte/src/metadata.js";

const placeholderPattern = /\b(TODO|TBD)\b|^(description|props)$/i;

function element(name) {
	for (const reference of Object.values(componentApiReference)) {
		const match = reference.find((entry) => entry.name === name);
		if (match) return match;
	}
	throw new Error(`Missing generated API element ${name}`);
}

function prop(elementName, propName) {
	const match = element(elementName).props.find((entry) => entry.name === propName);
	assert.ok(match, `${elementName}.${propName} is documented`);
	return match;
}

test("curated API contracts cover the exact catalog without handwritten types", () => {
	assert.deepEqual(Object.keys(apiContracts), Object.keys(componentMetadata));

	for (const [root, metadata] of Object.entries(componentMetadata)) {
		const expected = [root, ...(componentParts[root] ?? [])];
		const entries = apiContracts[root];
		assert.deepEqual(
			entries.map((entry) => entry.name),
			expected,
			`${root} follows canonical anatomy order`
		);

		for (const entry of entries) {
			assert.ok(entry.description.trim(), `${entry.name} has curated prose`);
			assert.doesNotMatch(entry.description, placeholderPattern);
			for (const [name, contract] of Object.entries(entry.ownProps)) {
				assert.ok(contract.description.trim(), `${entry.name}.${name} has curated prose`);
				assert.equal("type" in contract, false, `${entry.name}.${name} does not handwrite a type`);
			}
		}

		assert.notEqual(metadata.status, "deferred", `${root} is part of the release catalog`);
	}
});

test("generated API facts come from declarations and identify exact inheritance", () => {
	for (const [root] of Object.entries(componentMetadata)) {
		const expected = [root, ...(componentParts[root] ?? [])];
		const entries = componentApiReference[root];
		assert.deepEqual(
			entries.map((entry) => entry.name),
			expected
		);

		for (const entry of entries) {
			assert.ok(entry.inherited.label.trim(), `${entry.name} identifies inherited props`);
			assert.match(entry.inherited.url, /^https:\/\//, `${entry.name} links its source`);
			assert.doesNotMatch(entry.inherited.label, /Record<string,\s*unknown>/);
			assert.equal(
				entry.props.some((item) => item.name === "...rest"),
				false
			);
			assert.deepEqual(
				entry.props.map((item) => item.name),
				Object.keys(apiContracts[root].find((contract) => contract.name === entry.name).ownProps)
			);
			for (const item of [...entry.props, ...entry.facts]) {
				assert.ok(item.type.trim(), `${entry.name}.${item.name} has a declaration type`);
				assert.equal(
					item.bindable,
					entry.bindings.includes(item.name),
					`${entry.name}.${item.name} bindability matches its declaration`
				);
			}
		}
	}
});

test("representative generated contracts retain discriminants, snippets, refs, bindings, and portals", () => {
	const button = element("Button");
	assert.equal(button.signatures.length, 2);
	assert.match(button.signatures[0], /href: string/);
	assert.match(button.signatures[0], /type\?: undefined/);
	assert.match(button.signatures[1], /href\?: undefined/);
	assert.match(button.signatures[1], /type\?: .*button/);

	const accordion = element("Accordion");
	assert.deepEqual(accordion.bindings, ["ref", "value"]);
	assert.match(accordion.signatures[0], /type\?: "single".*value\?: string/);
	assert.match(accordion.signatures[1], /type: "multiple".*value\?: string\[\]/);

	const trigger = element("DialogTrigger");
	assert.ok(trigger.facts.some((fact) => fact.name === "child"));
	assert.ok(trigger.facts.some((fact) => fact.name === "ref" && fact.bindable));

	assert.deepEqual(element("Switch").bindings, ["checked", "ref"]);
	assert.match(
		element("Pagination").facts.find((fact) => fact.name === "children").type,
		/PaginationSnippetProps/
	);
	assert.doesNotMatch(
		element("Pagination").facts.find((fact) => fact.name === "children").type,
		/unknown/
	);

	for (const name of ["Slider", "Select"]) {
		assert.equal(element(name).signatures.length, 2, `${name} preserves both modes`);
	}

	for (const name of [
		"DialogPopup",
		"AlertDialogPopup",
		"SheetPopup",
		"DrawerPopup",
		"CommandDialogPopup",
		"MenuPopup",
		"PopoverPopup",
		"TooltipPopup",
		"PreviewCardPopup",
		"AutocompletePopup",
		"ComboboxPopup",
		"SelectPopup",
		"ContextMenuPopup",
		"ContextMenuSubPopup",
	]) {
		const portal = prop(name, "portalProps");
		assert.match(portal.type, /\bto\?:/);
		assert.match(portal.type, /\bdisabled\?: boolean/);
		assert.doesNotMatch(portal.type, /\bchildren\b|\bcontainer\b|\bkeepMounted\b/);
	}

	assert.equal(prop("ContextMenuPopup", "side").default, '"bottom"');
	assert.equal(prop("ContextMenuPopup", "align").default, '"center"');
	assert.equal(prop("ContextMenuPopup", "sideOffset").default, "4");
	assert.equal(
		prop("ContextMenuPopup", "escapeKeydownBehavior").default,
		'"defer-otherwise-close"'
	);
	assert.equal(prop("ContextMenuSubPopup", "escapeKeydownBehavior").default, '"close"');
	assert.match(prop("ContextMenuSubPopup", "side").default, /LTR.*RTL/);
});

test("HTML and Markdown consume the same generated API data", async () => {
	const navigation = await readFile("apps/www/src/lib/docs/navigation.js", "utf8");
	const renderer = await readFile(
		"apps/www/src/lib/components/docs/component-api-reference.svelte",
		"utf8"
	);
	assert.match(navigation, /api-reference\.generated\.js/);
	assert.match(renderer, /element\.signatures/);
	assert.match(renderer, /element\.facts/);
	assert.match(renderer, /element\.inherited/);
	assert.match(renderer, /bind:/);

	const metadata = componentMetadata.Select;
	const markdown = createComponentMarkdown(
		{
			...metadata,
			apiReference: componentApiReference.Select,
			foundation: metadata.foundation,
			href: "/docs/components/select",
			imports: ["Select", ...metadata.parts],
			name: "Select",
			parts: metadata.parts,
			statusLabel: "Stable",
		},
		'import Select from "coss-svelte";'
	);
	assert.match(markdown, /\*\*Signatures\*\*/);
	assert.match(markdown, /bind:value/);
	assert.match(markdown, /Composition and refs/);
	assert.match(markdown, /Inherits from \[Bits UI Select\.Root/);
});

test("generated output is deterministic and host-path free", async () => {
	const generated = await readFile("apps/www/src/lib/docs/api-reference.generated.js", "utf8");
	assert.match(generated, /@generated by scripts\/build-api-reference\.mjs/);
	assert.doesNotMatch(generated, /\/Users\/|\\\\Users\\\\|TemporaryItems|node_modules\/\.pnpm/);
});
