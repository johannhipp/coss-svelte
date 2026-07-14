import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { pathToFileURL } from "node:url";

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
	assert.match(theme, /\.cn-drawer\[data-state="open"\][\s\S]*transform:\s*translateY\(0\)/);
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

test("command dialog keeps COSS-style top and bottom bands", async () => {
	const theme = await readFile("packages/theme/src/style-coss.css", "utf8");

	assert.match(theme, /\.cn-command-dialog-popup[\s\S]*width:\s*min\(36rem/);
	assert.match(theme, /\.cn-command-dialog-popup[\s\S]*max-height:\s*min\(26\.25rem/);
	assert.match(
		theme,
		/\.cn-command-dialog-popup(?::not\(\.docs-search-dialog\))?::before[\s\S]*background:\s*color-mix/
	);
	assert.match(
		theme,
		/\.cn-command-dialog-popup(?::not\(\.docs-search-dialog\))?\s*>\s*\.cn-command\s*>\s*\.cn-command-input-group[\s\S]*margin:\s*0\.375rem\s+0\.625rem/
	);
	assert.match(
		theme,
		/\.cn-command-dialog-popup(?::not\(\.docs-search-dialog\))?\s*>\s*\.cn-command\s*>\s*\.cn-command-footer[\s\S]*padding:\s*0\.75rem\s+1\.25rem/
	);
});

test("date picker trigger formats the selected date and reuses calendar states", async () => {
	const [datePicker, renderer, examples, theme] = await Promise.all([
		readFile("packages/coss-svelte/src/components/DatePicker.svelte", "utf8"),
		readFile("apps/www/src/lib/components/docs/component-preview-renderer.svelte", "utf8"),
		readFile("apps/www/src/lib/docs/preview-examples.js", "utf8"),
		readFile("packages/theme/src/style-coss.css", "utf8"),
	]);

	assert.match(datePicker, /dateFormatter/);
	assert.match(datePicker, /dateLabel\s*=\s*\$derived\(formatDateValue\(value\)\s*\|\|\s*label\)/);
	assert.match(datePicker, /<span class="cn-date-picker-label">\{dateLabel\}<\/span>/);
	assert.match(renderer, /datePickerPreviewValue\s*=\s*\$state\(\)/);
	assert.match(renderer, /<DatePicker[\s\S]*bind:value=\{datePickerPreviewValue\}/);
	assert.match(examples, /let selectedDate = \$state\(\)/);
	assert.match(examples, /<DatePicker bind:value=\{selectedDate\}/);
	assert.match(theme, /\.cn-calendar-day\[data-outside-month\]/);
	assert.match(theme, /\.cn-calendar-cell\[data-today\]::after/);
});

test("dialog uses a framed surface and separated muted action footer", async () => {
	const theme = await readFile("packages/theme/src/style-coss.css", "utf8");

	assert.match(theme, /\.cn-dialog\s*{[\s\S]*padding:\s*0;[\s\S]*overflow:\s*hidden/);
	assert.match(theme, /\.cn-dialog::before\s*{[\s\S]*box-shadow:\s*0\s+1px\s+0\s+color-mix/);
	assert.match(theme, /\.cn-dialog-header\s*{[\s\S]*padding:\s*1\.5rem\s+1\.5rem\s+0\.75rem/);
	assert.match(
		theme,
		/\.cn-dialog-footer\s*{[\s\S]*border-top:\s*1px\s+solid\s+var\(--cn-border\)[\s\S]*background:\s*color-mix\(in\s+srgb,\s*var\(--muted\)\s+72%/
	);
	assert.match(theme, /\.cn-dialog-footer\s*{[\s\S]*padding:\s*1rem\s+1\.5rem/);
	assert.match(theme, /\.cn-dialog-footer \.cn-dialog-close\s*{[\s\S]*border-color:\s*transparent/);
});

test("drawer uses a full-width framed surface with a draggable close handle", async () => {
	const [theme, handle, drawer] = await Promise.all([
		readFile("packages/theme/src/style-coss.css", "utf8"),
		readFile("packages/coss-svelte/src/components/DrawerCreateHandle.svelte", "utf8"),
		readFile("packages/coss-svelte/src/components/Drawer.svelte", "utf8"),
	]);

	assert.match(
		theme,
		/\.cn-drawer\s*{[\s\S]*left:\s*0;[\s\S]*right:\s*0;[\s\S]*bottom:\s*0;[\s\S]*width:\s*100%;[\s\S]*overflow:\s*hidden/
	);
	assert.match(theme, /\.cn-drawer::before\s*{[\s\S]*box-shadow:\s*0\s+1px\s+0\s+color-mix/);
	assert.match(theme, /\.cn-drawer\[data-dragging\]\s*{[\s\S]*transition:\s*none[\s\S]*transform:/);
	assert.match(theme, /\.cn-drawer-handle\s*{[\s\S]*cursor:\s*grab[\s\S]*touch-action:\s*none/);
	assert.match(theme, /\.cn-drawer-handle:hover::before\s*{[\s\S]*background:/);
	assert.match(handle, /DialogPrimitive\.Close/);
	assert.match(handle, /onpointerdown=\{handlePointerDown\}/);
	assert.match(handle, /onpointermove=\{handlePointerMove\}/);
	assert.match(handle, /onpointerup=\{handlePointerUp\}/);
	assert.match(handle, /distance\s*>=\s*72/);
	assert.match(drawer, /<DrawerCreateHandle\s*\/>/);
});

test("docs previews use component-specific snippets and adaptive preview shells", async () => {
	const [docPage, previewTabs] = await Promise.all([
		readFile("apps/www/src/lib/components/docs/component-doc-page.svelte", "utf8"),
		readFile("apps/www/src/lib/components/docs/component-preview-tabs.svelte", "utf8"),
	]);

	assert.match(docPage, /previewUsageExamples/);
	assert.match(docPage, /page\.slug/);
	assert.doesNotMatch(docPage, /createFallbackUsageCode/);
	assert.doesNotMatch(docPage, /<\$\{component\.name\}\s*\/>/);
	assert.match(previewTabs, /component-preview-shell/);
	assert.match(previewTabs, /data-preview-slug=\{slug\}/);
	assert.match(previewTabs, /min-h-\[min\(420px,70svh\)\]/);
});

test("every component docs page has a preview-matching usage snippet", async () => {
	const [{ componentDocs }, { previewUsageExamples }] = await Promise.all([
		import(pathToFileURL("apps/www/src/lib/docs/navigation.js").href),
		import(pathToFileURL("apps/www/src/lib/docs/preview-examples.js").href),
	]);
	const markdown = await readFile("apps/www/src/lib/docs/markdown.js", "utf8");

	for (const component of componentDocs) {
		const snippet = previewUsageExamples[component.slug];

		assert.equal(typeof snippet, "string", `${component.slug} has a preview usage snippet`);
		assert.ok(snippet.trim().length > 0, `${component.slug} snippet is not empty`);
	}

	assert.match(
		previewUsageExamples.autocomplete,
		/<Autocomplete options=\{fruitOptions\}>/,
		"autocomplete snippet should match the fruit-option preview"
	);
	assert.match(
		previewUsageExamples.autocomplete,
		/\{#each fruitOptions as option\}/,
		"autocomplete snippet should render the same repeated options as the preview"
	);
	assert.doesNotMatch(
		previewUsageExamples.autocomplete,
		/<AutocompleteCollection>Autocomplete<\/AutocompleteCollection>/,
		"autocomplete snippet should not fall back to an empty collection example"
	);
	assert.match(markdown, /previewUsageExamples\[component\.slug\]/);
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
