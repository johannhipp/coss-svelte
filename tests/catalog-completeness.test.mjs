import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import {
	componentMetadata,
	componentParts,
	deferredComponents,
} from "../packages/coss-svelte/src/metadata.js";

const repositoryRoot = fileURLToPath(new URL("..", import.meta.url));
const packageRoot = path.join(repositoryRoot, "packages/coss-svelte");
const examplesRoot = path.join(repositoryRoot, "apps/www/src/lib/examples");
const registryRoot = path.join(repositoryRoot, "apps/registry/static/r");

const packageIndex = await readFile(path.join(packageRoot, "src/index.js"), "utf8");
const executableManifest = await readFile(path.join(examplesRoot, "index.ts"), "utf8");
const rawManifest = await readFile(path.join(examplesRoot, "source.server.ts"), "utf8");
const registryIndex = JSON.parse(await readFile(path.join(registryRoot, "index.json"), "utf8"));
const registryIndexBySlug = new Map(registryIndex.items.map((item) => [item.meta.slug, item]));

function publicImportPattern(name) {
	const exportedName = name === "Toast" ? "toastManager" : name;
	return new RegExp(`import \\{[^}]*\\b${exportedName}\\b[^}]*\\} from "coss-svelte"`);
}

test("every canonical component joins package, docs, declaration, and registry surfaces", async () => {
	assert.deepEqual(deferredComponents, [], "the release catalog has no deferred component roots");
	assert.match(executableManifest, /import\.meta\.glob\("\.\/\*\.svelte"\)/);
	assert.match(rawManifest, /import\.meta\.glob(?:<[^>]+>)?\("\.\/\*\.svelte"/);

	for (const [root, metadata] of Object.entries(componentMetadata)) {
		assert.ok(
			metadata.status === "stable" || metadata.status === "experimental",
			`${root} has a shippable status`
		);

		const publicElements = [root, ...(componentParts[root] ?? [])];
		for (const element of publicElements) {
			const sourcePath = path.join(packageRoot, "src/components", `${element}.svelte`);
			const declarationPath = path.join(packageRoot, "dist/components", `${element}.svelte.d.ts`);

			assert.equal(existsSync(sourcePath), true, `${root}: ${element} source exists`);
			assert.match(
				packageIndex,
				new RegExp(`export \\{ default as ${element} \\}`),
				`${root}: ${element} is exported`
			);
			assert.equal(existsSync(declarationPath), true, `${root}: ${element} declaration exists`);
			const declaration = await readFile(declarationPath, "utf8");
			assert.ok(declaration.trim().length > 0, `${root}: ${element} declaration is non-empty`);
			assert.doesNotMatch(declaration, /\bany\b/, `${root}: ${element} declaration avoids any`);
		}

		const examplePath = path.join(examplesRoot, `${metadata.slug}.svelte`);
		assert.equal(existsSync(examplePath), true, `${root}: executable example exists`);
		const exampleSource = await readFile(examplePath, "utf8");
		assert.ok(exampleSource.trim().length > 0, `${root}: example is non-empty`);
		assert.match(exampleSource, publicImportPattern(root), `${root}: example uses public package`);

		const indexItem = registryIndexBySlug.get(metadata.slug);
		assert.ok(indexItem, `${root}: registry index contains ${metadata.slug}`);
		assert.equal(indexItem.name, root, `${root}: registry index keeps canonical name`);
		assert.equal(indexItem.path, `${metadata.slug}.json`, `${root}: registry path is canonical`);

		const registryPath = path.join(registryRoot, `${metadata.slug}.json`);
		assert.equal(existsSync(registryPath), true, `${root}: generated registry item exists`);
		const registryItem = JSON.parse(await readFile(registryPath, "utf8"));
		assert.equal(registryItem.meta.status, metadata.status, `${root}: registry status matches`);
		assert.ok(registryItem.files.length > 0, `${root}: registry source closure is non-empty`);
		assert.ok(
			registryItem.dependencies.includes("@coss-svelte/theme"),
			`${root}: registry declares the shared theme`
		);

		const registryTargets = new Set(registryItem.files.map((file) => file.target));
		for (const element of publicElements) {
			assert.ok(
				registryTargets.has(`components/${element}.svelte`),
				`${root}: registry includes ${element}`
			);
		}
		for (const file of registryItem.files) {
			assert.equal(typeof file.content, "string", `${root}: ${file.target} has source`);
			assert.ok(file.content.trim().length > 0, `${root}: ${file.target} source is non-empty`);
		}
	}

	assert.equal(
		registryIndexBySlug.size,
		Object.keys(componentMetadata).length,
		"registry index has exactly one item per canonical root"
	);
});
