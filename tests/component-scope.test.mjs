import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { pathToFileURL } from "node:url";

import { componentMetadata } from "../packages/coss-svelte/src/metadata.js";

const stableComponents = [
	"Accordion",
	"Alert",
	"AlertDialog",
	"Autocomplete",
	"Avatar",
	"Badge",
	"Breadcrumb",
	"Button",
	"Calendar",
	"Card",
	"Checkbox",
	"CheckboxGroup",
	"Collapsible",
	"Combobox",
	"Command",
	"DatePicker",
	"Dialog",
	"Empty",
	"Field",
	"Fieldset",
	"Form",
	"Frame",
	"Group",
	"Input",
	"InputGroup",
	"Kbd",
	"Label",
	"Menu",
	"Meter",
	"OTPField",
	"Pagination",
	"Popover",
	"PreviewCard",
	"Progress",
	"RadioGroup",
	"ScrollArea",
	"Select",
	"Separator",
	"Sheet",
	"Skeleton",
	"Slider",
	"Spinner",
	"Switch",
	"Table",
	"Tabs",
	"Textarea",
	"Toggle",
	"ToggleGroup",
	"Toolbar",
	"Tooltip",
];

const optionalComponents = ["Drawer", "Sidebar", "Toast"];
const deferredComponents = ["NumberField"];

test("public package exports every stable v0.1 component", async () => {
	const index = await readFile("packages/coss-svelte/src/index.js", "utf8");

	for (const component of stableComponents) {
		assert.match(index, new RegExp(`\\b${component}\\b`), `${component} is exported`);
	}
});

test("docs preview renderer uses every stable component once", async () => {
	const previewRenderer = await readFile(
		"apps/www/src/lib/components/docs/component-preview-renderer.svelte",
		"utf8"
	);

	for (const component of stableComponents) {
		assert.match(
			previewRenderer,
			new RegExp(`<${component}\\b`),
			`${component} is used in the docs preview renderer`
		);
	}
});

test("docs component links resolve to local coss-svelte pages", async () => {
	const docsFiles = [
		"apps/www/src/lib/docs/navigation.js",
		"apps/www/src/routes/docs/+layout.svelte",
		"apps/www/src/routes/docs/components/[slug]/+page.js",
		"apps/www/src/routes/docs/components/[slug]/+page.svelte",
	];
	const scopedComponents = [...stableComponents, ...optionalComponents, ...deferredComponents];

	for (const docsFile of docsFiles) {
		assert.equal(existsSync(docsFile), true, `${docsFile} exists`);
	}

	const { componentDocs } = await import(pathToFileURL("apps/www/src/lib/docs/navigation.js").href);
	const routePage = await readFile(
		"apps/www/src/routes/docs/components/[slug]/+page.svelte",
		"utf8"
	);

	assert.doesNotMatch(
		routePage,
		/href=\{page\.docsUrl\}/,
		"component page should not redirect to COSS"
	);

	for (const component of scopedComponents) {
		const slug = componentMetadata[component].slug;
		const componentDoc = componentDocs.find((doc) => doc.slug === slug);

		assert.ok(componentDoc, `${component} has a component docs entry`);
		assert.equal(componentDoc.href, `/docs/components/${slug}`, `${component} links locally`);
		assert.notEqual(
			componentDoc.href,
			componentMetadata[component].docsUrl,
			`${component} avoids COSS URL`
		);
	}
});

test("implementation gap list tracks optional and deferred components", async () => {
	const gaps = await readFile("docs/implementation/unimplemented-components.md", "utf8");

	for (const component of [...optionalComponents, ...deferredComponents]) {
		assert.match(gaps, new RegExp(`\\b${component}\\b`), `${component} is tracked`);
	}
});
