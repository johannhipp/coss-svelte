import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

import {
	componentComposition,
	componentMetadata,
	compositionModel,
} from "../packages/coss-svelte/src/metadata.js";

const compositionModes = new Set([
	"compound",
	"children-first-fallback",
	"content-children",
	"payload-snippet",
	"additive",
	"presentational",
]);

test("root composition policy is explicit and documented", async () => {
	assert.deepEqual(compositionModel, {
		root: "children-first-convenience",
		childrenPrecedence: "custom-children",
		fallback: "explicit-props",
	});

	const outline = await readFile("docs/scope/component-implementation-outline.md", "utf8");
	assert.match(outline, /Root composition is explicit per component/);
	assert.match(
		outline,
		/`children-first-fallback`: children replace the whole generated convenience hierarchy/
	);
	assert.match(outline, /it is not a package-wide override/);
	assert.ok(Object.keys(componentMetadata).length > 0, "metadata remains the root catalog");
});

test("every metadata root has one closed composition mode", () => {
	assert.deepEqual(
		Object.keys(componentComposition).sort(),
		Object.keys(componentMetadata).sort(),
		"composition metadata must cover exactly the published root catalog"
	);

	for (const [component, mode] of Object.entries(componentComposition)) {
		assert.equal(compositionModes.has(mode), true, `${component} has invalid mode ${mode}`);
	}
});

test("documented composition exceptions remain explicit", () => {
	assert.equal(componentComposition.Collapsible, "content-children");
	assert.equal(componentComposition.Sidebar, "additive");
	assert.equal(componentComposition.Calendar, "payload-snippet");
	assert.equal(componentComposition.Pagination, "payload-snippet");
	assert.equal(componentComposition.ContextMenu, "compound");
});
