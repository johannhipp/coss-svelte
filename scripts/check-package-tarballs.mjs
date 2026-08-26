import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

const packageSpecs = [
	{
		directory: "packages/theme",
		exactFiles: [
			"LICENSE",
			"README.md",
			"package.json",
			"src/components.css",
			"src/style-coss.css",
			"src/tokens.css",
		],
		name: "@coss-svelte/theme",
	},
	{
		directory: "packages/coss-svelte",
		name: "coss-svelte",
		requiredFiles: [
			"LICENSE",
			"README.md",
			"package.json",
			"dist/index.js",
			"dist/index.d.ts",
			"dist/metadata.js",
			"dist/metadata.d.ts",
		],
	},
];

function packDryRun(directory) {
	const result = spawnSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
		cwd: join(repositoryRoot, directory),
		encoding: "utf8",
	});

	if (result.error) throw result.error;
	assert.equal(result.status, 0, result.stderr || result.stdout);

	const output = JSON.parse(result.stdout);
	assert.equal(output.length, 1, `${directory} should produce one tarball`);
	return output[0];
}

for (const spec of packageSpecs) {
	const manifest = JSON.parse(
		await readFile(join(repositoryRoot, spec.directory, "package.json"), "utf8")
	);
	const packed = packDryRun(spec.directory);
	const files = packed.files.map((file) => file.path).sort();

	assert.equal(packed.name, spec.name);
	assert.equal(packed.version, manifest.version);
	assert.equal(
		files.some((file) => file.endsWith(".map")),
		false,
		`${spec.name} ships source maps`
	);
	assert.equal(
		files.some((file) => /(^|\/)(tests?|__tests__)(\/|$)/.test(file)),
		false,
		`${spec.name} ships tests`
	);

	if (spec.exactFiles) {
		assert.deepEqual(files, [...spec.exactFiles].sort(), `${spec.name} tarball file list changed`);
	} else {
		assert.equal(
			files.every(
				(file) =>
					["LICENSE", "README.md", "package.json"].includes(file) || file.startsWith("dist/")
			),
			true,
			`${spec.name} contains a file outside its public package surface`
		);
		for (const file of spec.requiredFiles) {
			assert.equal(files.includes(file), true, `${spec.name} is missing ${file}`);
		}
	}

	console.log(`${packed.id}: ${files.length} files verified (${packed.filename})`);
}
