import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { componentMetadata, deferredComponents } from "../packages/coss-svelte/src/metadata.js";

const repositoryRoot = fileURLToPath(new URL("..", import.meta.url));
const packageRoot = path.join(repositoryRoot, "packages/coss-svelte");
const examplesRoot = path.join(repositoryRoot, "apps/www/src/lib/examples");
const registryRoot = path.join(repositoryRoot, "apps/registry/static/r");

const packageIndex = await readFile(path.join(packageRoot, "src/index.js"), "utf8");
const executableManifest = await readFile(path.join(examplesRoot, "index.ts"), "utf8");
const rawManifest = await readFile(path.join(examplesRoot, "source.server.ts"), "utf8");
const registryIndex = JSON.parse(await readFile(path.join(registryRoot, "index.json"), "utf8"));

function duplicateValues(values) {
	const counts = new Map();
	for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
	return [...counts.entries()]
		.filter(([, count]) => count > 1)
		.map(([value, count]) => `${value} (${count}x)`)
		.sort();
}

function assertUnique(label, values) {
	const duplicates = duplicateValues(values);
	assert.deepEqual(duplicates, [], `${label} contains duplicates: ${duplicates.join(", ")}`);
}

function assertExactSet(label, actual, expected) {
	assertUnique(label, actual);
	assertUnique(`${label} authority`, expected);

	const actualSet = new Set(actual);
	const expectedSet = new Set(expected);
	const missing = [...expectedSet].filter((value) => !actualSet.has(value)).sort();
	const extra = [...actualSet].filter((value) => !expectedSet.has(value)).sort();

	assert.deepEqual(
		{ extra, missing },
		{ extra: [], missing: [] },
		`${label} differs from metadata; missing: ${missing.join(", ") || "none"}; extra: ${
			extra.join(", ") || "none"
		}`
	);
}

function namesWithExtension(entries, extension) {
	return entries
		.filter((entry) => entry.endsWith(extension))
		.map((entry) => entry.slice(0, -extension.length));
}

function publicImportPattern(name) {
	const exportedName = name === "Toast" ? "toastManager" : name;
	return new RegExp(`import \\{[^}]*\\b${exportedName}\\b[^}]*\\} from "coss-svelte"`);
}

test("every canonical component joins package, docs, declaration, and registry surfaces", async () => {
	assert.deepEqual(deferredComponents, [], "the release catalog has no deferred component roots");
	assert.match(executableManifest, /import\.meta\.glob\("\.\/\*\.svelte"\)/);
	assert.match(rawManifest, /import\.meta\.glob(?:<[^>]+>)?\("\.\/\*\.svelte"/);

	const metadataEntries = Object.entries(componentMetadata);
	const roots = metadataEntries.map(([root]) => root);
	const slugs = metadataEntries.map(([, metadata]) => metadata.slug);
	const canonicalElements = metadataEntries.flatMap(([root, metadata]) => [
		root,
		...metadata.parts,
	]);
	const packageExports = [
		...packageIndex.matchAll(
			/^export \{ default as ([A-Za-z0-9_]+) \} from "\.\/components\/([A-Za-z0-9_]+)\.svelte";$/gm
		),
	];
	const packageExportNames = packageExports.map((match) => match[1]);
	const packageExportTargets = packageExports.map((match) => match[2]);
	const sourceNames = namesWithExtension(
		await readdir(path.join(packageRoot, "src/components")),
		".svelte"
	);
	const declarationNames = namesWithExtension(
		await readdir(path.join(packageRoot, "dist/components")),
		".svelte.d.ts"
	);
	const exampleSlugs = namesWithExtension(await readdir(examplesRoot), ".svelte");
	const registryFileSlugs = namesWithExtension(await readdir(registryRoot), ".json").filter(
		(slug) => slug !== "index"
	);
	const registryNames = registryIndex.items.map((item) => item.name);
	const registrySlugs = registryIndex.items.map((item) => item.meta.slug);
	const registryPaths = registryIndex.items.map((item) => item.path);

	assertUnique("metadata root keys", roots);
	assertUnique(
		"metadata canonical names",
		metadataEntries.map(([, metadata]) => metadata.name)
	);
	assertUnique("metadata slugs", slugs);
	assertExactSet("package component exports", packageExportNames, canonicalElements);
	assertExactSet("package component export targets", packageExportTargets, canonicalElements);
	assert.deepEqual(
		packageExports
			.filter((match) => match[1] !== match[2])
			.map((match) => `${match[1]} -> ${match[2]}`),
		[],
		"package component export names and source targets match"
	);
	assertExactSet("package component sources", sourceNames, canonicalElements);
	assertExactSet("package component declarations", declarationNames, canonicalElements);
	assertExactSet("executable examples", exampleSlugs, slugs);
	assertExactSet("registry item names", registryNames, roots);
	assertExactSet("registry item slugs", registrySlugs, slugs);
	assertExactSet(
		"registry index paths",
		registryPaths,
		slugs.map((slug) => `${slug}.json`)
	);
	assertExactSet("registry item filenames", registryFileSlugs, slugs);

	const registryIndexBySlug = new Map(registryIndex.items.map((item) => [item.meta.slug, item]));

	for (const [root, metadata] of metadataEntries) {
		const label = `${root} (${metadata.slug})`;
		assert.equal(metadata.name, root, `${label}: metadata name matches its root key`);
		assert.ok(
			metadata.status === "stable" || metadata.status === "experimental",
			`${label}: has a shippable status`
		);

		const publicElements = [root, ...metadata.parts];
		for (const element of publicElements) {
			const sourcePath = path.join(packageRoot, "src/components", `${element}.svelte`);
			const declarationPath = path.join(packageRoot, "dist/components", `${element}.svelte.d.ts`);

			assert.equal(existsSync(sourcePath), true, `${label}: ${element} source exists`);
			assert.equal(existsSync(declarationPath), true, `${label}: ${element} declaration exists`);
			const declaration = await readFile(declarationPath, "utf8");
			assert.ok(declaration.trim().length > 0, `${label}: ${element} declaration is non-empty`);
		}

		const examplePath = path.join(examplesRoot, `${metadata.slug}.svelte`);
		assert.equal(existsSync(examplePath), true, `${label}: executable example exists`);
		const exampleSource = await readFile(examplePath, "utf8");
		assert.ok(exampleSource.trim().length > 0, `${label}: example is non-empty`);
		assert.match(exampleSource, publicImportPattern(root), `${label}: example uses public package`);

		const indexItem = registryIndexBySlug.get(metadata.slug);
		assert.ok(indexItem, `${label}: registry index contains the canonical slug`);
		assert.equal(indexItem.name, root, `${label}: registry index keeps canonical name`);
		assert.equal(indexItem.meta.status, metadata.status, `${label}: registry status matches`);
		assert.equal(indexItem.path, `${metadata.slug}.json`, `${label}: registry path is canonical`);

		const registryPath = path.join(registryRoot, `${metadata.slug}.json`);
		assert.equal(existsSync(registryPath), true, `${label}: generated registry item exists`);
		const registryItem = JSON.parse(await readFile(registryPath, "utf8"));
		assert.equal(registryItem.name, root, `${label}: registry item keeps canonical name`);
		assert.equal(registryItem.meta.slug, metadata.slug, `${label}: registry item slug matches`);
		assert.equal(registryItem.meta.status, metadata.status, `${label}: registry status matches`);
		assert.ok(registryItem.files.length > 0, `${label}: registry source closure is non-empty`);
		assert.ok(
			registryItem.dependencies.includes("@coss-svelte/theme"),
			`${label}: registry declares the shared theme`
		);

		assertUnique(
			`${label}: registry targets`,
			registryItem.files.map((file) => file.target)
		);
		const registryTargets = new Set(registryItem.files.map((file) => file.target));
		for (const element of publicElements) {
			assert.ok(
				registryTargets.has(`components/${element}.svelte`),
				`${label}: registry includes ${element}`
			);
		}
		for (const file of registryItem.files) {
			assert.equal(typeof file.content, "string", `${label}: ${file.target} has source`);
			assert.ok(file.content.trim().length > 0, `${label}: ${file.target} source is non-empty`);
		}
	}
});
