import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { pathToFileURL } from "node:url";

const headerPath = "apps/www/src/lib/components/docs/docs-header.svelte";
const searchPath = "apps/www/src/lib/components/docs/docs-search.svelte";
const navigationPath = "apps/www/src/lib/docs/navigation.js";
const commandInputPath = "packages/coss-svelte/src/components/CommandInput.svelte";

test("header uses a real docs search component", async () => {
	const header = await readFile(headerPath, "utf8");

	assert.equal(existsSync(searchPath), true, "docs search component should exist");
	assert.match(header, /DocsSearch/, "header should render the docs search component");
	assert.doesNotMatch(
		header,
		/<button[\s\S]*aria-label=["']Search docs["'][\s\S]*>[\s\S]*⌘ K[\s\S]*<\/button>/,
		"header search must not remain an inert button"
	);
});

test("docs search opens from keyboard and searches local docs", async () => {
	const [search, navigation] = await Promise.all([
		readFile(searchPath, "utf8"),
		readFile(navigationPath, "utf8"),
	]);

	for (const component of [
		"CommandDialog",
		"CommandDialogPopup",
		"CommandDialogTrigger",
		"CommandInput",
		"CommandItem",
	]) {
		assert.match(search, new RegExp(component), `docs search should use ${component}`);
	}

	assert.match(search, /metaKey\s*\|\|\s*event\.ctrlKey/, "search should support Cmd/Ctrl+K");
	assert.match(search, /preventDefault\(\)/, "keyboard shortcut should prevent browser search");
	assert.match(search, /docsSearchGroups/, "search should use the shared grouped docs index");
	assert.match(
		search,
		/bind:value=\{searchValue\}/,
		"search input should update the local query value"
	);
	assert.match(search, /getSearchScore/, "search should rank matching docs");
	assert.match(search, /data-search-href/, "search results should expose their local target");
	assert.match(search, /onclick/, "search results should navigate on click");
	assert.match(search, /onSelect/, "search results should navigate from command selection");
	assert.match(search, /\/docs\/components\//, "search should navigate to local component routes");
	assert.match(
		navigation,
		/href:\s*["']\/particles["']/,
		"search should include the local particles page"
	);
	assert.match(search, /No results found/, "search should expose an empty state");
	assert.doesNotMatch(
		search,
		/https:\/\/coss\.com\/ui\/docs/,
		"search results should not redirect to COSS"
	);
	assert.match(navigation, /export const resourcePages/, "resource pages should be shared");
	assert.match(navigation, /export const searchPages/, "search pages should be shared");
	assert.match(navigation, /export const searchGroups/, "grouped search pages should be shared");
});

test("command input exposes bindable value for custom search UIs", async () => {
	const source = await readFile(commandInputPath, "utf8");

	assert.match(source, /value\s*=\s*\$bindable\(["']["']\)/, "CommandInput value is bindable");
	assert.match(source, /bind:value/, "CommandInput forwards value to the Bits input");
	assert.match(source, /data-slot="command-input-group"/, "CommandInput exposes an input group");
	assert.match(source, /data-slot="command-icon"/, "CommandInput includes a search affordance");
});

test("docs search index covers overview, components, resources, and particles", async () => {
	const { componentDocs, resourcePages, searchGroups, searchPages } = await import(
		pathToFileURL(navigationPath).href
	);

	assert.ok(componentDocs.length > 40, "component docs should be included in the search index");
	assert.ok(resourcePages.length > 0, "resource pages should be included in the search index");
	assert.ok(
		searchPages.some((page) => page.group === "Overview" && page.href === "/docs/introduction"),
		"overview pages should be searchable"
	);
	assert.ok(
		searchPages.some(
			(page) => page.group === "Components" && page.href === "/docs/components/button"
		),
		"component pages should be searchable"
	);
	assert.ok(
		searchPages.some((page) => page.group === "Resources" && page.href === "/docs/llms"),
		"resource pages should be searchable"
	);
	assert.ok(
		searchPages.some((page) => page.group === "Pages" && page.href === "/particles"),
		"particles page should be searchable locally"
	);
	assert.ok(
		searchGroups.some(
			(group) =>
				group.title === "Components" &&
				group.items.some((page) => page.href === "/docs/components/button")
		),
		"grouped search index should include component pages"
	);
});
