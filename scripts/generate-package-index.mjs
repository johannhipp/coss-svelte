import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { componentMetadata } from "../packages/coss-svelte/src/metadata.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = join(root, "packages/coss-svelte/src/index.js");
const sourcePath = join(root, "packages/coss-svelte/src/components");
const checkMode = process.argv.includes("--check");

const componentNames = [
	...new Set(
		Object.values(componentMetadata)
			.filter((metadata) => metadata.status !== "deferred")
			.flatMap((metadata) => [metadata.name, ...metadata.parts])
	),
].sort((left, right) => left.localeCompare(right));

for (const name of componentNames) {
	const sourceFile = join(sourcePath, `${name}.svelte`);
	if (!existsSync(sourceFile)) {
		throw new Error(`Canonical metadata points to missing component source: ${name}`);
	}
}

const generated = `${[
	...componentNames.map(
		(name) => `export { default as ${name} } from "./components/${name}.svelte";`
	),
	"export {",
	"	componentMetadata,",
	"	componentParts,",
	"	componentStatus,",
	"	deferredComponents,",
	"	experimentalComponents,",
	"	stableComponents,",
	'} from "./metadata.js";',
	'export { cn } from "./utils.js";',
].join("\n")}\n`;

if (checkMode) {
	const current = readFileSync(outputPath, "utf8");
	if (current !== generated) {
		console.error("packages/coss-svelte/src/index.js is out of date. Run pnpm package:index.");
		process.exitCode = 1;
	} else {
		console.log("Package index is up to date");
	}
} else {
	writeFileSync(outputPath, generated);
	console.log(`Wrote ${componentNames.length} package exports.`);
}
