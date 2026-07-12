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
		"apps/www/src/lib/components/docs/docs-mobile-menu.svelte",
		"apps/www/src/lib/components/docs/particles-browser.svelte",
	];

	for (const routeFile of routeFiles) {
		assert.equal(existsSync(routeFile), true, `${routeFile} exists`);
	}

	const [loadSource, pageSource, mobileMenuSource, browserSource] = await Promise.all(
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
		/Filter by component/,
		"particles route should describe component-based filtering"
	);
	assert.match(pageSource, /DocsMobileMenu/, "particles page should render the mobile menu");
	assert.match(
		pageSource,
		/onMenu=\{\(\) => \(mobileNavOpen = true\)\}/,
		"particles header should open the mobile menu"
	);
	assert.match(
		mobileMenuSource,
		/open = \$bindable\(false\)/,
		"mobile menu should expose bindable open state"
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
		/hasActiveFilters/,
		"particles browser should wait for a query or component filter before rendering particles"
	);
	assert.match(
		browserSource,
		/:\s*\[\]/,
		"particles browser should use an empty result set before filtering"
	);
	assert.match(
		browserSource,
		/else if hasActiveFilters/,
		"particles browser should hide the no-results state until a filter is active"
	);
	assert.match(
		browserSource,
		/page\.url\.searchParams\.get\(["']tags["']\)/,
		"particles browser should read selected components from the tags query parameter"
	);
	assert.match(
		browserSource,
		/nextUrl\.searchParams\.set\(["']tags["']/,
		"particles browser should write selected components to the tags query parameter"
	);
	assert.match(
		browserSource,
		/keepFocus:\s*true/,
		"particles filter updates should keep focus like an in-page control"
	);
	assert.match(
		browserSource,
		/each particles as particle/,
		"particle filters should be sourced from supported particles"
	);
	assert.match(browserSource, /particle\.title/, "particle filters should display component names");
	assert.doesNotMatch(
		loadSource + pageSource + browserSource,
		/categoryOrder|selectedCategories|categories=\{data\.categories\}/,
		"particle filters should not use custom category groupings"
	);
	assert.match(browserSource, /Tag/, "selected particle filters should show tag icons");
	assert.doesNotMatch(
		browserSource,
		/Search selected particles/,
		"particle search should not show a selected-particles suggestion"
	);
	assert.match(
		browserSource,
		/Copy Registry URL/,
		"particle cards should expose an icon-only registry URL copy action"
	);
	assert.match(browserSource, /View code/, "particle cards should link to view code");
	assert.match(
		browserSource,
		/bg-muted\/35/,
		"particle cards should use a consistent muted footer bar"
	);
	assert.match(
		loadSource,
		/registryUrl:\s*`https:\/\/coss\.com\/ui\/r\/\$\{name\}\.json`/,
		"each particle should derive a unique registry URL from its name"
	);
	assert.doesNotMatch(
		pageSource + browserSource,
		/https:\/\/coss\.com\/ui\/particles/,
		"particles page should not link back to the COSS particles page"
	);
});
