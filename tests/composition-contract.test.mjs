import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

import { componentMetadata, compositionModel } from "../packages/coss-svelte/src/metadata.js";

test("root composition policy is explicit and documented", async () => {
	assert.deepEqual(compositionModel, {
		root: "children-first-convenience",
		childrenPrecedence: "custom-children",
		fallback: "explicit-props",
	});

	const outline = await readFile("docs/scope/component-implementation-outline.md", "utf8");
	assert.match(outline, /custom `children` snippets\s+always take precedence/);
	assert.match(outline, /convenience props render an explicit fallback/);
	assert.ok(Object.keys(componentMetadata).length > 0, "metadata remains the root catalog");
});
