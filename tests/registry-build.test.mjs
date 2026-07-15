import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
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
		for (const source of item.files) {
			assert.ok(
				built.files.some((file) => file.path === source.path && file.target === source.target),
				`${item.name} retains its declared root and parts`
			);
		}
		assert.ok(built.files.every((file) => typeof file.content === "string"));
	}
});

test("registry build check mode reports the checked-in registry is current", () => {
	const result = spawnSync(process.execPath, ["scripts/build-registry.mjs", "--check"], {
		encoding: "utf8",
	});

	assert.equal(result.status, 0, result.stderr || result.stdout);
	assert.match(result.stdout, /Registry is up to date/);
	assert.doesNotMatch(result.stdout, /Built \d+ registry items/);
});
