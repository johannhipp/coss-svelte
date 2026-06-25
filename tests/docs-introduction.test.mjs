import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const headerPath = "apps/www/src/lib/components/docs/docs-header.svelte";
const shellPath = "apps/www/src/lib/components/docs/docs-shell.svelte";
const introPath = "apps/www/src/routes/docs/introduction/+page.svelte";
const themePath = "packages/theme/src/style-coss.css";

test("docs header brand is coss-svelte without an extra ui suffix", async () => {
	const header = await readFile(headerPath, "utf8");

	assert.match(header, />coss-svelte</, "header should render the coss-svelte brand");
	assert.doesNotMatch(header, />\s*ui\s*</, "header brand should not render a ui suffix");
});

test("docs sidebar remains scrollable without showing a scrollbar", async () => {
	const [shell, theme] = await Promise.all([
		readFile(shellPath, "utf8"),
		readFile(themePath, "utf8"),
	]);

	assert.match(
		shell,
		/docs-sidebar-scroll/,
		"docs shell should apply the hidden scrollbar utility"
	);
	assert.match(theme, /\.docs-sidebar-scroll/, "theme should define the sidebar scrollbar utility");
	assert.match(theme, /scrollbar-width:\s*none/, "Firefox sidebar scrollbar should be hidden");
	assert.match(theme, /::-webkit-scrollbar/, "WebKit sidebar scrollbar should be hidden");
	assert.match(theme, /display:\s*none/, "WebKit scrollbar hiding rule should be present");
});

test("introduction mirrors the COSS docs shape while staying local to coss-svelte", async () => {
	const intro = await readFile(introPath, "utf8");

	for (const section of [
		"How It Works",
		"Built on Bits UI, Designed for Svelte",
		"Primitives and Particles",
	]) {
		assert.match(intro, new RegExp(section), `intro should include ${section}`);
	}

	for (const localPhrase of ["copy, paste, and own", "SvelteKit", "Bits UI", "local coss-svelte"]) {
		assert.match(intro, new RegExp(localPhrase), `intro should include ${localPhrase}`);
	}

	for (const omittedCossOnlySection of [
		"Built for Humans and AI",
		"Open Source, Made Sustainable",
		"Get Involved",
		"contribution guidelines",
		"atoms",
		"Cal.com",
	]) {
		assert.doesNotMatch(
			intro,
			new RegExp(omittedCossOnlySection, "i"),
			`intro should not claim unavailable COSS-only content: ${omittedCossOnlySection}`
		);
	}

	assert.match(intro, /docs-intro-flow/, "intro should use the animated intro layout class");
	assert.match(intro, /docs-intro-note/, "intro should include an early-access note");
});

test("introduction has a minimal page-open animation with reduced-motion support", async () => {
	const theme = await readFile(themePath, "utf8");

	assert.match(theme, /@keyframes docs-intro-enter/, "intro animation keyframes should exist");
	assert.match(theme, /\.docs-intro-flow/, "intro animation should target the intro flow");
	assert.match(
		theme,
		/prefers-reduced-motion:\s*reduce/,
		"intro animation should respect reduced motion"
	);
});
