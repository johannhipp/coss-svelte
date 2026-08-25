import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { pathToFileURL } from "node:url";

const markdownPath = "apps/www/src/lib/docs/markdown.js";
const navigationPath = "apps/www/src/lib/docs/navigation.js";
const gettingStartedPath = "apps/www/src/routes/docs/getting-started/+page.svelte";
const llmsPagePath = "apps/www/src/routes/docs/llms/+page.svelte";
const skillsPagePath = "apps/www/src/routes/docs/skills/+page.svelte";

test("llms.txt map links every component Markdown route", async () => {
	const [{ createLlmsTxt }, { componentDocs }] = await Promise.all([
		import(pathToFileURL(markdownPath).href),
		import(pathToFileURL(navigationPath).href),
	]);
	const llms = createLlmsTxt({ baseUrl: "https://example.com" });

	assert.match(llms, /^# coss-svelte/m, "llms.txt should start with the product heading");
	assert.match(llms, /## Agent Rules/, "llms.txt should include Svelte-specific rules");
	assert.match(llms, /## Overview/, "llms.txt should include overview links");
	assert.match(llms, /## Components/, "llms.txt should include component links");
	assert.match(llms, /## Machine-readable Registry/, "llms.txt should include registry links");
	assert.match(llms, /## Resources/, "llms.txt should include resource links");
	assert.match(
		llms,
		/The current catalog contains \*\*55 components\*\*: \*\*52 stable\*\*, \*\*3 experimental\*\*, and \*\*0 deferred\*\*/,
		"llms.txt should expose current catalog status counts"
	);
	assert.match(llms, /https:\/\/example\.com\/docs\/skills\.md/, "skills route should be listed");
	assert.match(llms, /https:\/\/example\.com\/r\/index\.json/, "registry index should be listed");
	assert.match(llms, /\/docs\/components\/context-menu\.md/, "Context Menu should be listed");
	assert.match(llms, /\/docs\/components\/number-field\.md/, "Number Field should be listed");

	for (const component of componentDocs) {
		assert.match(
			llms,
			new RegExp(`/docs/components/${component.slug}\\.md`),
			`${component.title} should have a Markdown docs link`
		);
	}
});

test("component Markdown includes agent-critical implementation sections", async () => {
	const [{ createComponentMarkdown }, { getComponentDoc }] = await Promise.all([
		import(pathToFileURL(markdownPath).href),
		import(pathToFileURL(navigationPath).href),
	]);
	const button = getComponentDoc("button");
	const markdown = createComponentMarkdown(button);

	for (const section of [
		"Installation",
		"Usage",
		"Anatomy",
		"API Reference",
		"Status",
		"Agent Notes",
	]) {
		assert.match(
			markdown,
			new RegExp(`## ${section}`),
			`component Markdown should include ${section}`
		);
	}

	assert.match(markdown, /pnpm package:prepare/, "source setup should be present");
	assert.match(markdown, /npm view coss-svelte version/, "availability check should be present");
	assert.match(
		markdown,
		/import \{ Button \} from "coss-svelte"/,
		"usage import should be present"
	);
	assert.match(markdown, /\| Foundation \| native \|/, "foundation should be present");
	assert.match(markdown, /\| Status \| Stable \|/, "status should be present");
	assert.match(markdown, /\/r\/button\.json/, "registry manifest should be present");
	assert.match(markdown, /Do not emit JSX/, "Svelte-specific agent rules should be present");
});

test("component Markdown includes COSS-style API element reference", async () => {
	const [{ createComponentMarkdown }, { getComponentDoc }] = await Promise.all([
		import(pathToFileURL(markdownPath).href),
		import(pathToFileURL(navigationPath).href),
	]);
	const autocomplete = getComponentDoc("autocomplete");
	const markdown = createComponentMarkdown(autocomplete);

	assert.match(markdown, /### Autocomplete/, "root element should be documented");
	assert.match(markdown, /### AutocompleteInput/, "part element should be documented");
	assert.match(markdown, /\| Prop \| Type \|/, "prop table should be present");
	assert.match(markdown, /`options`/, "autocomplete options prop should be documented");
	assert.match(markdown, /`showTrigger`/, "autocomplete input trigger prop should be documented");
	assert.match(
		markdown,
		/## Implementation Details/,
		"implementation details should be separate from API reference"
	);
});

test("resource navigation exposes LLMs and Skills pages", async () => {
	const { resourcePages, searchPages } = await import(pathToFileURL(navigationPath).href);

	for (const resource of [
		{ href: "/docs/llms", title: "LLMs" },
		{ href: "/docs/skills", title: "Skills" },
	]) {
		assert.ok(
			resourcePages.some((page) => page.href === resource.href && page.title === resource.title),
			`${resource.title} should be a resource page`
		);
		assert.ok(
			searchPages.some((page) => page.group === "Resources" && page.href === resource.href),
			`${resource.title} should be searchable as a resource`
		);
	}
});

test("raw Markdown routes and agent docs pages exist", async () => {
	for (const path of [
		"apps/www/src/routes/llms.txt/+server.js",
		"apps/www/src/routes/docs/[slug].md/+server.js",
		"apps/www/src/routes/docs/components/[slug].md/+server.js",
		"apps/registry/static/r/index.json",
		"apps/registry/static/schema/registry-item.json",
		skillsPagePath,
	]) {
		assert.equal(existsSync(path), true, `${path} should exist`);
	}
});

test("human docs advertise the agent workflow", async () => {
	const [gettingStarted, llmsPage, skillsPage] = await Promise.all([
		readFile(gettingStartedPath, "utf8"),
		readFile(llmsPagePath, "utf8"),
		readFile(skillsPagePath, "utf8"),
	]);

	assert.match(
		gettingStarted,
		/Getting your agents to use coss-svelte/,
		"getting started should explain how agents use coss-svelte"
	);
	assert.match(gettingStarted, /href="\/docs\/skills"/, "getting started should link to the skill");
	assert.match(gettingStarted, /href="\/llms\.txt"/, "getting started should link to llms.txt");
	assert.ok(
		gettingStarted.indexOf('href="/docs/skills"') < gettingStarted.indexOf('href="/llms.txt"'),
		"getting started should lead with the skill link"
	);
	assert.match(llmsPage, /Component Routes/, "LLMs page should list raw component routes");
	assert.match(
		skillsPage,
		/npx skills@latest add johannhipp\/skills --skill coss-svelte/,
		"skills page should install only the maintained coss-svelte skill"
	);
	assert.match(
		gettingStarted,
		/npm view coss-svelte version/,
		"getting started should not imply unpublished packages are available"
	);
});
