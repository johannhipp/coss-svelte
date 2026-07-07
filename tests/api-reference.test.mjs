import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { pathToFileURL } from "node:url";

import { componentMetadata, componentParts } from "../packages/coss-svelte/src/metadata.js";

const apiReferencePath = "apps/www/src/lib/docs/api-reference.js";
const ignoredSourceProps = new Set(["children", "class"]);
const placeholderPattern = /\b(TODO|TBD)\b|^(description|props)$/i;

function splitTopLevel(value) {
	const parts = [];
	let current = "";
	let depth = 0;
	let quote = "";

	for (let index = 0; index < value.length; index += 1) {
		const character = value[index];
		const previous = value[index - 1];

		if (quote) {
			current += character;
			if (character === quote && previous !== "\\") {
				quote = "";
			}
			continue;
		}

		if (character === '"' || character === "'" || character === "`") {
			quote = character;
			current += character;
			continue;
		}

		if (character === "{" || character === "[" || character === "(") {
			depth += 1;
		}

		if (character === "}" || character === "]" || character === ")") {
			depth -= 1;
		}

		if (character === "," && depth === 0) {
			parts.push(current.trim());
			current = "";
			continue;
		}

		current += character;
	}

	if (current.trim()) {
		parts.push(current.trim());
	}

	return parts;
}

function extractPropsBlock(source) {
	const match = source.match(/let\s*\{([\s\S]*?)\}\s*=\s*\$props\(\)/);
	return match?.[1] ?? "";
}

function extractPublicCustomProps(source) {
	return splitTopLevel(extractPropsBlock(source))
		.map((part) => part.trim())
		.filter((part) => part && !part.startsWith("..."))
		.map((part) => part.split(/[:=]/)[0]?.trim())
		.filter((name) => name && !ignoredSourceProps.has(name));
}

test("API reference data covers every documented component and part", async () => {
	assert.equal(existsSync(apiReferencePath), true, `${apiReferencePath} should exist`);

	const { componentApiReference } = await import(pathToFileURL(apiReferencePath).href);

	for (const [name] of Object.entries(componentMetadata)) {
		const expectedElements = [name, ...(componentParts[name] ?? [])];
		const reference = componentApiReference[name];

		assert.ok(Array.isArray(reference), `${name} has API reference entries`);
		assert.deepEqual(
			reference.map((entry) => entry.name),
			expectedElements,
			`${name} API reference follows anatomy order`
		);

		const uniqueNames = new Set(reference.map((entry) => entry.name));
		assert.equal(uniqueNames.size, reference.length, `${name} has no duplicate API entries`);

		for (const entry of reference) {
			assert.equal(typeof entry.description, "string", `${entry.name} has a description`);
			assert.ok(entry.description.trim().length > 0, `${entry.name} description is not empty`);
			assert.doesNotMatch(entry.description, placeholderPattern, `${entry.name} has real prose`);

			for (const prop of entry.props ?? []) {
				assert.equal(typeof prop.name, "string", `${entry.name} prop has a name`);
				assert.equal(typeof prop.type, "string", `${entry.name}.${prop.name} has a type`);
				assert.equal(
					typeof prop.description,
					"string",
					`${entry.name}.${prop.name} has a description`
				);
				assert.ok(prop.name.trim().length > 0, `${entry.name} prop name is not empty`);
				assert.ok(prop.type.trim().length > 0, `${entry.name}.${prop.name} type is not empty`);
				assert.ok(
					prop.description.trim().length > 0,
					`${entry.name}.${prop.name} description is not empty`
				);
				assert.doesNotMatch(
					prop.description,
					placeholderPattern,
					`${entry.name}.${prop.name} has real prose`
				);
			}
		}
	}
});

test("API reference documents public custom props from component source", async () => {
	const { componentApiReference } = await import(pathToFileURL(apiReferencePath).href);

	for (const [componentName] of Object.entries(componentMetadata)) {
		const elements = componentApiReference[componentName] ?? [];

		for (const entry of elements) {
			const sourcePath = `packages/coss-svelte/src/components/${entry.name}.svelte`;

			if (!existsSync(sourcePath)) {
				continue;
			}

			const source = await readFile(sourcePath, "utf8");
			const sourceProps = extractPublicCustomProps(source);
			const documentedProps = new Set((entry.props ?? []).map((prop) => prop.name));

			for (const prop of sourceProps) {
				assert.ok(documentedProps.has(prop), `${entry.name} documents public prop ${prop}`);
			}
		}
	}
});
