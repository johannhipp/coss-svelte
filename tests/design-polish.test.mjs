import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("theme defines intentional motion tokens and button press feedback", async () => {
	const theme = await readFile("packages/theme/src/style-coss.css", "utf8");

	assert.match(theme, /--ease-out:\s*cubic-bezier\(0\.23,\s*1,\s*0\.32,\s*1\)/);
	assert.match(theme, /--ease-in-out:\s*cubic-bezier\(0\.77,\s*0,\s*0\.175,\s*1\)/);
	assert.match(theme, /--ease-drawer:\s*cubic-bezier\(0\.32,\s*0\.72,\s*0,\s*1\)/);
	assert.match(theme, /\.cn-button:active[\s\S]*transform:\s*scale\(0\.97\)/);
	assert.match(theme, /\.cn-button[\s\S]*transition:[\s\S]*transform\s+140ms\s+var\(--ease-out\)/);
});

test("floating and overlay surfaces animate with origin-aware transform and opacity", async () => {
	const theme = await readFile("packages/theme/src/style-coss.css", "utf8");

	assert.match(
		theme,
		/\.cn-dialog-overlay[\s\S]*transition:\s*opacity\s+180ms\s+var\(--ease-out\)/
	);
	assert.match(
		theme,
		/\.cn-popover-content[\s\S]*transform-origin:\s*var\(--bits-popover-content-transform-origin\)/
	);
	assert.match(
		theme,
		/\.cn-tooltip-content[\s\S]*transform-origin:\s*var\(--bits-tooltip-content-transform-origin\)/
	);
	assert.match(
		theme,
		/\.cn-select-popup[\s\S]*transition:[\s\S]*opacity\s+160ms\s+var\(--ease-out\)/
	);
	assert.match(theme, /\.cn-sheet-right\[data-state="open"\][\s\S]*transform:\s*translateX\(0\)/);
	assert.match(
		theme,
		/\.cn-drawer\[data-state="open"\][\s\S]*transform:\s*translateX\(-50%\)\s+translateY\(0\)/
	);
	assert.match(theme, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*\.cn-popover-content/);
	assert.doesNotMatch(theme, /scale\(0\)/);
});

test("keyboard command dialog is explicitly instant", async () => {
	const theme = await readFile("packages/theme/src/style-coss.css", "utf8");

	assert.match(theme, /\.cn-command-dialog-popup[\s\S]*transition:\s*none/);
	assert.match(
		theme,
		/\.cn-dialog-overlay\[data-slot="command-dialog-overlay"\][\s\S]*transition:\s*none/
	);
});

test("docs previews use component-specific snippets and adaptive preview shells", async () => {
	const [docPage, previewTabs] = await Promise.all([
		readFile("apps/www/src/lib/components/docs/component-doc-page.svelte", "utf8"),
		readFile("apps/www/src/lib/components/docs/component-preview-tabs.svelte", "utf8"),
	]);

	assert.match(docPage, /previewUsageExamples/);
	assert.match(docPage, /page\.slug/);
	assert.doesNotMatch(docPage, /<\$\{component\.name\}\s*\/>/);
	assert.match(previewTabs, /component-preview-shell/);
	assert.match(previewTabs, /data-preview-slug=\{slug\}/);
	assert.match(previewTabs, /min-h-\[min\(420px,70svh\)\]/);
});

test("particles page gives component previews first-viewport priority", async () => {
	const [page, browser] = await Promise.all([
		readFile("apps/www/src/routes/particles/+page.svelte", "utf8"),
		readFile("apps/www/src/lib/components/docs/particles-browser.svelte", "utf8"),
	]);

	assert.match(page, /py-8/);
	assert.match(page, /lg:py-10/);
	assert.match(page, /mb-6/);
	assert.doesNotMatch(page, /lg:py-16/);
	assert.match(browser, /mb-6/);
	assert.match(browser, /min-h-44/);
});
