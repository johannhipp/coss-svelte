import { spawnSync } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { registryItems } from "../packages/registry/src/index.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const defaultOutDir = join(root, "apps/registry/static/r");

function registryIndex(items) {
	return {
		$schema: "https://coss-svelte.dev/schema/registry-index.json",
		name: "coss-svelte",
		items: items.map((item) => ({
			name: item.name,
			title: item.title,
			description: item.description,
			type: item.type,
			categories: item.categories,
			docs: item.docs,
			meta: item.meta,
			path: `${item.meta.slug}.json`,
		})),
	};
}

async function writeJson(path, data) {
	await mkdir(dirname(path), { recursive: true });
	await writeFile(path, `${JSON.stringify(data, null, "\t")}\n`);
}

function formatGeneratedJson(outDir) {
	const result = spawnSync("pnpm", ["exec", "biome", "format", "--write", outDir], {
		cwd: root,
		stdio: "inherit",
	});

	if (result.error) {
		throw result.error;
	}

	if (result.status !== 0) {
		throw new Error(`Biome format failed for ${relative(root, outDir)}`);
	}
}

export async function buildRegistry({
	outDir = defaultOutDir,
	format = outDir === defaultOutDir,
} = {}) {
	await rm(outDir, { force: true, recursive: true });
	await mkdir(outDir, { recursive: true });

	const index = registryIndex(registryItems);
	const indexPath = join(outDir, "index.json");

	await writeJson(indexPath, index);

	for (const item of registryItems) {
		await writeJson(join(outDir, `${item.meta.slug}.json`), item);
	}

	if (format) {
		formatGeneratedJson(outDir);
	}

	return {
		indexPath,
		itemCount: registryItems.length,
		outDir,
		relativeOutDir: relative(root, outDir),
	};
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	const result = await buildRegistry();

	console.log(`Built ${result.itemCount} registry items in ${result.relativeOutDir}.`);
}
