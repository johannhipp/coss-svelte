import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

const root = process.cwd();

const themePath = path.join(root, "packages/theme/src/style-coss.css");
const headerPath = path.join(root, "apps/www/src/lib/components/docs/docs-header.svelte");
const appHtmlPath = path.join(root, "apps/www/src/app.html");
const componentsPath = path.join(root, "packages/coss-svelte/src/components");

const designTokens = [
	"--background",
	"--foreground",
	"--card",
	"--card-foreground",
	"--popover",
	"--popover-foreground",
	"--primary",
	"--primary-foreground",
	"--secondary",
	"--secondary-foreground",
	"--muted",
	"--muted-foreground",
	"--accent",
	"--accent-foreground",
	"--destructive",
	"--destructive-foreground",
	"--info",
	"--info-foreground",
	"--success",
	"--success-foreground",
	"--warning",
	"--warning-foreground",
	"--border",
	"--input",
	"--ring",
];

const componentTokens = [
	"--cn-background",
	"--cn-foreground",
	"--cn-muted",
	"--cn-muted-foreground",
	"--cn-surface",
	"--cn-surface-raised",
	"--cn-border",
	"--cn-border-strong",
	"--cn-primary",
	"--cn-primary-foreground",
	"--cn-accent",
	"--cn-accent-foreground",
	"--cn-danger",
	"--cn-danger-surface",
	"--cn-warning",
	"--cn-warning-surface",
	"--cn-info",
	"--cn-info-surface",
	"--cn-shadow",
];

const surfaceTokens = [
	"--sidebar",
	"--sidebar-foreground",
	"--sidebar-accent",
	"--sidebar-accent-foreground",
	"--sidebar-border",
	"--sidebar-ring",
];

function getCssBlock(css, selector) {
	const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const match = css.match(new RegExp(`${escapedSelector}\\s*\\{([\\s\\S]*?)\\n\\}`, "m"));
	return match?.[1] ?? "";
}

async function listSvelteFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const nestedFiles = await Promise.all(
		entries.map(async (entry) => {
			const entryPath = path.join(directory, entry.name);

			if (entry.isDirectory()) {
				return listSvelteFiles(entryPath);
			}

			return entry.isFile() && entry.name.endsWith(".svelte") ? [entryPath] : [];
		})
	);

	return nestedFiles.flat();
}

test("theme defines a complete dark-mode token surface", async () => {
	const themeCss = await readFile(themePath, "utf8");
	const rootBlock = getCssBlock(themeCss, ":root");
	const darkBlock = getCssBlock(themeCss, ".dark");

	assert.ok(rootBlock, "expected a :root token block in the shared theme");
	assert.ok(darkBlock, "expected a .dark token block in the shared theme");
	assert.match(
		rootBlock,
		/color-scheme:\s*light/,
		"light mode should expose the native color scheme"
	);
	assert.match(
		darkBlock,
		/color-scheme:\s*dark/,
		"dark mode should expose the native color scheme"
	);

	for (const token of [...designTokens, ...componentTokens, ...surfaceTokens]) {
		assert.match(rootBlock, new RegExp(`${token}:`), `missing light token ${token}`);
		assert.match(darkBlock, new RegExp(`${token}:`), `missing dark token ${token}`);
	}
});

test("theme component rules use semantic colors for dark compatibility", async () => {
	const themeCss = await readFile(themePath, "utf8");
	const sidebarRule = themeCss.match(/\.cn-sidebar\s*\{[\s\S]*?\n\}/g)?.at(-1) ?? "";
	const sidebarHoverRule = themeCss.match(/\.cn-sidebar a:hover\s*\{[\s\S]*?\n\}/g)?.at(-1) ?? "";
	const sidebarCss = `${sidebarRule}\n${sidebarHoverRule}`;

	assert.match(sidebarCss, /var\(--sidebar\)/, "sidebar should use the semantic sidebar surface");
	assert.match(
		sidebarCss,
		/var\(--sidebar-foreground\)/,
		"sidebar should use the semantic sidebar foreground"
	);
	assert.match(
		sidebarCss,
		/var\(--sidebar-accent\)/,
		"sidebar hover should use the semantic sidebar accent"
	);
	assert.doesNotMatch(
		sidebarCss,
		/var\(--color-(?:neutral-50|black)\)/,
		"sidebar rules should not hard-code light-mode color primitives"
	);
});

test("docs app applies the selected theme before and after hydration", async () => {
	const [appHtml, header] = await Promise.all([
		readFile(appHtmlPath, "utf8"),
		readFile(headerPath, "utf8"),
	]);

	assert.match(appHtml, /coss-svelte-theme/, "app.html should read the persisted theme");
	assert.match(
		appHtml,
		/prefers-color-scheme:\s*dark/,
		"app.html should honor system dark preference"
	);
	assert.match(
		appHtml,
		/classList\.toggle\(\s*["']dark["']/,
		"app.html should set .dark before hydration"
	);

	assert.doesNotMatch(
		header,
		/Theme toggle placeholder/,
		"theme control must not be a placeholder"
	);
	assert.match(
		header,
		/document\.documentElement\.classList\.contains\(["']dark["']\)/,
		"theme toggle should initialize from the pre-applied root .dark class"
	);
	assert.match(header, /localStorage/, "theme toggle should persist the user's selection");
	assert.match(
		header,
		/classList\.toggle\(\s*["']dark["']/,
		"theme toggle should update the root .dark class"
	);
	assert.match(header, /aria-pressed/, "theme toggle should expose pressed state");
});

test("component source avoids hard-coded light color classes", async () => {
	const files = await listSvelteFiles(componentsPath);
	const forbiddenColorPattern =
		/\b(?:bg|text|border|ring)-(?:white|black|neutral-(?:50|100|900|950)|zinc-(?:50|100|900|950)|slate-(?:50|100|900|950)|gray-(?:50|100|900|950))\b|#[0-9a-fA-F]{6}\b|rgb\(/;
	const offenders = [];

	for (const file of files) {
		const source = await readFile(file, "utf8");

		if (forbiddenColorPattern.test(source)) {
			offenders.push(path.relative(root, file));
		}
	}

	assert.deepEqual(
		offenders,
		[],
		`component files hard-code light colors: ${offenders.join(", ")}`
	);
});
