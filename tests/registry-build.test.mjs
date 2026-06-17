import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

import { registryItems } from "../packages/registry/src/index.js";
import { buildRegistry } from "../scripts/build-registry.mjs";

test("registry build writes an index and component item files", async () => {
	const outDir = await mkdtemp(join(tmpdir(), "coss-svelte-registry-"));
	const result = await buildRegistry({ outDir });

	assert.equal(result.itemCount, registryItems.length);
	assert.ok(result.indexPath.endsWith("index.json"));

	const index = JSON.parse(await readFile(result.indexPath, "utf8"));

	assert.equal(index.items.length, registryItems.length);
	assert.equal(index.items[0].type, "registry:ui");

	for (const item of registryItems) {
		const slug = item.meta.slug;
		const built = JSON.parse(await readFile(join(outDir, `${slug}.json`), "utf8"));

		assert.equal(built.name, item.name);
		assert.equal(built.meta.status, item.meta.status);
		assert.deepEqual(built.files, item.files);
	}
});
