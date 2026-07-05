import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const ignoredDirectories = new Set([".git", ".svelte-kit", "dist", "node_modules"]);
const dependencyFields = [
	"dependencies",
	"devDependencies",
	"peerDependencies",
	"optionalDependencies",
];

async function findPackageManifests(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const manifests = [];

	for (const entry of entries) {
		const file = path.join(directory, entry.name);

		if (entry.isDirectory()) {
			if (!ignoredDirectories.has(entry.name)) {
				manifests.push(...(await findPackageManifests(file)));
			}
			continue;
		}

		if (entry.name === "package.json") {
			manifests.push(file);
		}
	}

	return manifests;
}

test('workspace package manifests avoid "latest" dependency ranges', async () => {
	const manifestPaths = await findPackageManifests(".");
	const floating = [];

	for (const manifestPath of manifestPaths) {
		const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

		for (const field of dependencyFields) {
			for (const [name, version] of Object.entries(manifest[field] ?? {})) {
				if (version === "latest") {
					floating.push(`${manifestPath}:${field}.${name}`);
				}
			}
		}
	}

	assert.deepEqual(floating, []);
});
