import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { registryItems } from "../packages/registry/src/index.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const defaultOutDir = join(root, "apps/registry/static/r");
const sourceRoot = join(root, "packages/coss-svelte/src");
const hostDependencies = new Set(["svelte"]);

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

function packageName(specifier) {
	if (specifier.startsWith("@")) return specifier.split("/", 2).join("/");
	return specifier.split("/", 1)[0];
}

function importSpecifiers(source) {
	return [...source.matchAll(/(?:from\s+|import\s*\(\s*|import\s+)["']([^"']+)["']/g)].map(
		(match) => match[1]
	);
}

function resolveSourcePath(sourcePath, specifier) {
	const base = join(sourcePath, specifier);
	const extensionless = base.replace(/\.(?:js|ts|svelte)$/, "");
	const candidates = [
		base,
		`${extensionless}.ts`,
		`${extensionless}.js`,
		`${extensionless}.svelte`,
		join(base, "index.ts"),
		join(base, "index.js"),
	];
	return candidates.find((candidate) => existsSync(candidate));
}

async function resolveClosure(item) {
	const files = [];
	const seen = new Set();
	const dependencies = new Set(item.dependencies ?? []);

	async function visit(absolutePath, target) {
		if (seen.has(absolutePath)) return;
		if (!absolutePath.startsWith(`${sourceRoot}/`)) {
			throw new Error(`Registry source escapes package root: ${absolutePath}`);
		}
		seen.add(absolutePath);
		const content = await readFile(absolutePath, "utf8");
		files.push({
			path: `packages/coss-svelte/src/${target}`,
			target,
			type: "registry:ui",
			content,
		});

		for (const specifier of importSpecifiers(content)) {
			if (specifier.startsWith(".")) {
				const resolved = resolveSourcePath(dirname(absolutePath), specifier);
				if (!resolved) throw new Error(`Unable to resolve ${specifier} from ${absolutePath}`);
				const targetPath = relative(sourceRoot, resolved);
				await visit(resolved, normalize(targetPath).replace(/^\.\//, ""));
			} else {
				const dependency = packageName(specifier);
				if (!hostDependencies.has(dependency)) dependencies.add(dependency);
			}
		}
	}

	for (const file of item.files ?? []) {
		const relativePath = file.path.replace("packages/coss-svelte/src/", "");
		const absolutePath = join(sourceRoot, relativePath.replace(/\.js$/, ".ts"));
		if (!existsSync(absolutePath)) throw new Error(`Registry entry is missing: ${file.path}`);
		await visit(absolutePath, file.target.replace(/^components\//, "components/"));
	}

	return { files, dependencies: [...dependencies].sort() };
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
		const closure = await resolveClosure(item);
		await writeJson(join(outDir, `${item.meta.slug}.json`), {
			...item,
			files: closure.files,
			dependencies: closure.dependencies,
		});
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

async function readJsonFiles(dir) {
	return (await readdir(dir)).filter((file) => file.endsWith(".json")).sort();
}

async function validateGeneratedRegistry(dir) {
	for (const file of await readJsonFiles(dir)) {
		if (file === "index.json") continue;
		const item = JSON.parse(await readFile(join(dir, file), "utf8"));
		const targets = new Set();
		for (const entry of item.files ?? []) {
			if (typeof entry.content !== "string" || entry.content.length === 0) {
				throw new Error(`${file} contains a path-only or empty registry file`);
			}
			if (targets.has(entry.target))
				throw new Error(`${file} contains duplicate target ${entry.target}`);
			targets.add(entry.target);
		}
	}
}

export async function checkRegistry() {
	const tempDir = await mkdtemp(join(tmpdir(), "coss-svelte-registry-check-"));

	try {
		await buildRegistry({ outDir: tempDir, format: true });
		await validateGeneratedRegistry(tempDir);

		const expectedFiles = await readJsonFiles(tempDir);
		const currentFiles = await readJsonFiles(defaultOutDir);
		const mismatches = [];

		if (expectedFiles.join("\n") !== currentFiles.join("\n")) {
			mismatches.push("file list differs");
		}

		for (const file of expectedFiles.filter((file) => currentFiles.includes(file))) {
			const expected = await readFile(join(tempDir, file), "utf8");
			const current = await readFile(join(defaultOutDir, file), "utf8");

			if (expected !== current) {
				mismatches.push(file);
			}
		}

		return {
			current: mismatches.length === 0,
			mismatches,
		};
	} finally {
		await rm(tempDir, { force: true, recursive: true });
	}
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	if (process.argv.includes("--check")) {
		const result = await checkRegistry();

		if (result.current) {
			console.log("Registry is up to date");
		} else {
			console.error(
				`apps/registry/static/r is out of date: ${result.mismatches.join(", ")}. Run pnpm registry:build.`
			);
			process.exitCode = 1;
		}
	} else {
		const result = await buildRegistry();

		console.log(`Built ${result.itemCount} registry items in ${result.relativeOutDir}.`);
	}
}
