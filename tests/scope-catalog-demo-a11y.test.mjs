import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

test("component demos expose basic overlay and popup interaction affordances", async () => {
	const source = await readFile("apps/scope-catalog/src/lib/ComponentDemo.svelte", "utf8");

	assert.match(source, /function\s+handleGlobalKeydown\(event:\s*KeyboardEvent\)/);
	assert.match(source, /event\.key\s*===\s*"Escape"/);
	assert.match(source, /<svelte:window\s+onkeydown={handleGlobalKeydown}\s*\/>/);

	assert.match(source, /function\s+handleBackdropClick/);
	assert.ok((source.match(/handleBackdropClick/g) ?? []).length >= 5);

	assert.match(source, /aria-expanded={popoverOpen}/);
	assert.match(source, /aria-controls="popover-panel"/);
	assert.match(source, /aria-expanded={menuOpen}/);
	assert.match(source, /aria-controls="menu-panel"/);
	assert.match(source, /aria-expanded={commandOpen}/);
	assert.match(source, /aria-controls="command-panel"/);

	assert.match(source, /let\s+toastTimeout/);
	assert.match(source, /clearTimeout\(toastTimeout\)/);
	assert.doesNotMatch(source, /window\.setTimeout/);
});
