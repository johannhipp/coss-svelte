import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

import {
	componentMetadata,
	componentParts,
	componentStatus,
	deferredComponents,
	experimentalComponents,
	stableComponents,
} from "../packages/coss-svelte/src/metadata.js";

const sourceRoot = "packages/coss-svelte/src/components";

test("canonical component metadata has one unique status and slug per root", () => {
	const names = Object.keys(componentMetadata);
	const slugs = names.map((name) => componentMetadata[name].slug);

	assert.equal(new Set(names).size, names.length, "component names are unique");
	assert.equal(new Set(slugs).size, slugs.length, "component slugs are unique");
	assert.deepEqual(
		stableComponents,
		names.filter((name) => componentMetadata[name].status === "stable"),
		"stable roots are derived from metadata"
	);
	assert.deepEqual(
		experimentalComponents,
		names.filter((name) => componentMetadata[name].status === "experimental"),
		"experimental roots are derived from metadata"
	);
	assert.deepEqual(
		deferredComponents,
		names.filter((name) => componentMetadata[name].status === "deferred"),
		"deferred roots are derived from metadata"
	);

	for (const name of names) {
		assert.equal(
			componentStatus[name],
			componentMetadata[name].status,
			`${name} status is canonical`
		);
		assert.deepEqual(
			componentParts[name],
			componentMetadata[name].parts,
			`${name} parts are canonical`
		);
	}
});

test("component parts have one owner and real source files", async () => {
	const index = await readFile("packages/coss-svelte/src/index.js", "utf8");
	const owners = new Map();

	for (const [root, parts] of Object.entries(componentParts)) {
		if (componentMetadata[root].status !== "deferred") {
			assert.equal(existsSync(`${sourceRoot}/${root}.svelte`), true, `${root} source exists`);
			assert.match(index, new RegExp(`export \\{ default as ${root} \\}`), `${root} is exported`);
		}

		for (const part of parts) {
			assert.equal(owners.has(part), false, `${part} has one canonical owner`);
			owners.set(part, root);
			assert.equal(existsSync(`${sourceRoot}/${part}.svelte`), true, `${part} source exists`);
			assert.match(index, new RegExp(`export \\{ default as ${part} \\}`), `${part} is exported`);
		}
	}
});
