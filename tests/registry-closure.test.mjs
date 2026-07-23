import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { test } from "node:test";

const registryRoot = new URL("../apps/registry/static/r/", import.meta.url);

test("generated registry files contain complete source closures", async () => {
	const files = (await readdir(registryRoot)).filter(
		(file) => file.endsWith(".json") && file !== "index.json"
	);
	assert.ok(files.length > 0);

	for (const file of files) {
		const item = JSON.parse(await readFile(new URL(file, registryRoot), "utf8"));
		for (const source of item.files) {
			assert.equal(typeof source.content, "string", `${file}/${source.target} has content`);
			assert.ok(source.content.length > 0, `${file}/${source.target} is not empty`);
		}
		assert.equal(new Set(item.files.map((source) => source.target)).size, item.files.length);
		for (const source of item.files.filter((source) => source.path.endsWith(".ts"))) {
			assert.match(
				source.target,
				/\.ts$/,
				`${file}/${source.target} preserves its TypeScript extension`
			);
		}
	}
});
