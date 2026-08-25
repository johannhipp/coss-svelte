import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { pathToFileURL } from "node:url";

import {
	componentMetadata,
	deferredComponents,
	experimentalComponents,
	stableComponents,
} from "../packages/coss-svelte/src/metadata.js";

test("public package exports every stable v0.1 component", async () => {
	const index = await readFile("packages/coss-svelte/src/index.js", "utf8");

	for (const component of stableComponents) {
		assert.match(index, new RegExp(`\\b${component}\\b`), `${component} is exported`);
	}
});

test("docs examples cover every stable component", async () => {
	const examplesIndex = await readFile("apps/www/src/lib/examples/index.ts", "utf8");
	for (const component of stableComponents) {
		const slug = componentMetadata[component].slug;
		assert.match(examplesIndex, /import\.meta\.glob\("\.\/\*\.svelte"\)/);
		assert.equal(existsSync(`apps/www/src/lib/examples/${slug}.svelte`), true);
	}
});

test("docs component links resolve to local coss-svelte pages", async () => {
	const docsFiles = [
		"apps/www/src/lib/docs/navigation.js",
		"apps/www/src/routes/docs/+layout.svelte",
		"apps/www/src/routes/docs/components/[slug]/+page.server.js",
		"apps/www/src/routes/docs/components/[slug]/+page.svelte",
	];
	const scopedComponents = [...stableComponents, ...experimentalComponents, ...deferredComponents];

	for (const docsFile of docsFiles) {
		assert.equal(existsSync(docsFile), true, `${docsFile} exists`);
	}

	const { componentDocs } = await import(pathToFileURL("apps/www/src/lib/docs/navigation.js").href);
	for (const component of scopedComponents) {
		const slug = componentMetadata[component].slug;
		const componentDoc = componentDocs.find((doc) => doc.slug === slug);

		assert.ok(componentDoc, `${component} has a component docs entry`);
		assert.equal(componentDoc.href, `/docs/components/${slug}`, `${component} links locally`);
	}
});
