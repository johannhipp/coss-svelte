import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("root catalog has responsive press feedback and reduced-motion handling", async () => {
	const [styles, page] = await Promise.all([
		readFile("apps/scope-catalog/src/app.css", "utf8"),
		readFile("apps/scope-catalog/src/routes/+page.svelte", "utf8"),
	]);

	assert.match(styles, /--ease-out:\s*cubic-bezier\(0\.23,\s*1,\s*0\.32,\s*1\)/);
	assert.match(styles, /\.button:active[\s\S]*transform:\s*scale\(0\.97\)/);
	assert.match(
		styles,
		/@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*scroll-behavior:\s*auto/
	);
	assert.match(styles, /\.modal[\s\S]*@starting-style[\s\S]*opacity:\s*0/);
	assert.doesNotMatch(styles, /scale\(0\)/);
	assert.match(page, /Scope inventory demos/);
});
