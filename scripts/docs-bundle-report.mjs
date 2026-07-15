import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("apps/www/.svelte-kit/output/client/_app/immutable");

async function collect(directory) {
	const files = [];
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const file = path.join(directory, entry.name);
		if (entry.isDirectory()) files.push(...(await collect(file)));
		else if (entry.name.endsWith(".js")) files.push(file);
	}
	return files;
}

const files = await collect(outputDirectory);
const sizes = await Promise.all(
	files.map(async (file) => ({ file, size: (await stat(file)).size }))
);
const largest = sizes.sort((left, right) => right.size - left.size)[0];

if (!largest) throw new Error("Docs client bundle is missing; run the docs build first.");
console.log(`Largest docs client chunk: ${largest.file} (${largest.size} bytes)`);
if (largest.size > 700_000) throw new Error("Docs client chunk exceeds the 700 kB baseline.");
