import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const classTokenPattern = /\bcn-[a-z0-9]+(?:-[a-z0-9]+)*\b/g;

async function collectFiles(dir, extensions, files = []) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);

		if (entry.isDirectory()) {
			await collectFiles(path, extensions, files);
			continue;
		}

		if (extensions.has(extname(entry.name))) {
			files.push(path);
		}
	}

	return files;
}

function extractTokens(source) {
	return new Set(source.match(classTokenPattern) ?? []);
}

async function extractSourceClasses(root) {
	const sourceRoot = join(root, "packages/coss-svelte/src");
	const files = await collectFiles(sourceRoot, new Set([".svelte", ".js", ".ts"]));
	const classes = new Set();
	const byFile = {};

	for (const file of files) {
		const tokens = extractTokens(await readFile(file, "utf8"));

		if (tokens.size === 0) {
			continue;
		}

		byFile[relative(root, file)] = [...tokens].sort();

		for (const token of tokens) {
			classes.add(token);
		}
	}

	return { byFile, classes };
}

async function extractThemeClasses(root) {
	const themePath = join(root, "packages/theme/src/components.css");
	const tokens = extractTokens(await readFile(themePath, "utf8"));

	return { path: relative(root, themePath), classes: tokens };
}

export async function validateCnClassMap({ root = process.cwd() } = {}) {
	const [source, theme] = await Promise.all([
		extractSourceClasses(root),
		extractThemeClasses(root),
	]);
	const sourceClasses = [...source.classes].sort();
	const themeClasses = [...theme.classes].sort();
	const themeSet = new Set(themeClasses);
	const missing = sourceClasses.filter((token) => !themeSet.has(token));

	return {
		missing,
		sourceByFile: source.byFile,
		sourceClasses,
		themeClasses,
		themePath: theme.path,
	};
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	const result = await validateCnClassMap();

	if (result.missing.length > 0) {
		console.error(`Missing theme rules for ${result.missing.length} cn-* classes:`);
		for (const token of result.missing) {
			console.error(`- ${token}`);
		}
		process.exitCode = 1;
	} else {
		console.log(
			`Validated ${result.sourceClasses.length} cn-* source classes against ${result.themeClasses.length} theme classes.`
		);
	}
}
