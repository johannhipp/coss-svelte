import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const packageManifest = JSON.parse(
	await readFile(new URL("../packages/coss-svelte/package.json", import.meta.url), "utf8")
);
const indexSource = await readFile(
	new URL("../packages/coss-svelte/src/index.js", import.meta.url),
	"utf8"
);

test("package publishes generated declarations instead of a handwritten escape hatch", async () => {
	await assert.doesNotReject(
		access(new URL("../packages/coss-svelte/dist/index.d.ts", import.meta.url))
	);
	assert.equal(packageManifest.types, "./dist/index.d.ts");
	assert.doesNotMatch(indexSource, /AnyComponent|Record<string, unknown>/);
	const declarationFiles = [];
	async function collect(directory) {
		for (const entry of await readdir(directory, { withFileTypes: true })) {
			const file = path.join(directory, entry.name);
			if (entry.isDirectory()) await collect(file);
			else if (file.endsWith(".d.ts")) declarationFiles.push(file);
		}
	}
	await collect(fileURLToPath(new URL("../packages/coss-svelte/dist", import.meta.url)));
	for (const file of declarationFiles) {
		const declaration = await readFile(file, "utf8");
		assert.doesNotMatch(
			declaration,
			/\bany\b|Record<string, any>|Component<Record<string, unknown>>/,
			`untruthful prop escape hatch in ${file}`
		);
	}
});

test("package exports generated component entrypoints", () => {
	const exportCount = (indexSource.match(/^export \{ default as /gm) ?? []).length;
	assert.equal(exportCount, 256);
});
