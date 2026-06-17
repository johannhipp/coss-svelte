import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("header points particles navigation to the local particles page", async () => {
	const header = await readFile("apps/www/src/lib/components/docs/docs-header.svelte", "utf8");

	assert.match(
		header,
		/href=["']\/particles["']/,
		"header should link to the local particles page"
	);
	assert.doesNotMatch(
		header,
		/href=["']https:\/\/coss\.com\/ui\/particles["']/,
		"header should not link to COSS particles"
	);
});

test("local particles route renders a component-catalog view", async () => {
	const routeFiles = [
		"apps/www/src/routes/particles/+page.js",
		"apps/www/src/routes/particles/+page.svelte",
		"apps/www/src/lib/components/docs/particles-browser.svelte",
	];

	for (const routeFile of routeFiles) {
		assert.equal(existsSync(routeFile), true, `${routeFile} exists`);
	}

	const [loadSource, pageSource, browserSource] = await Promise.all(
		routeFiles.map((routeFile) => readFile(routeFile, "utf8"))
	);

	assert.match(
		loadSource,
		/componentDocs/,
		"particles route should source data from component docs"
	);
	assert.match(loadSource, /particles/, "particles route should expose particle data");
	assert.match(pageSource, /Browse Particles/, "particles route should use the COSS page title");
	assert.match(
		pageSource,
		/ready-to-use particles/,
		"particles route should explain the local catalog"
	);
	assert.match(
		browserSource,
		/ComponentPreviewRenderer/,
		"particles page should preview local coss-svelte components"
	);
	assert.match(
		browserSource,
		/filteredParticles/,
		"particles browser should filter the component catalog"
	);
	assert.match(
		browserSource,
		/page\.url\.searchParams\.get\(["']tags["']\)/,
		"particles browser should read selected filters from the tags query parameter"
	);
	assert.match(
		browserSource,
		/nextUrl\.searchParams\.set\(["']tags["']/,
		"particles browser should write selected filters to the tags query parameter"
	);
	assert.match(
		browserSource,
		/keepFocus:\s*true/,
		"particles filter updates should keep focus like an in-page control"
	);
	assert.doesNotMatch(
		pageSource + browserSource,
		/https:\/\/coss\.com\/ui\/particles/,
		"particles page should not link back to the COSS particles page"
	);
});
