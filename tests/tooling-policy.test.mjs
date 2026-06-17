import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const forbiddenConfigFiles = [
	".eslintrc",
	".eslintrc.cjs",
	".eslintrc.js",
	".eslintrc.json",
	"eslint.config.js",
	"eslint.config.mjs",
	"prettier.config.js",
	"prettier.config.mjs",
	".prettierrc",
	".prettierrc.json",
];

test("tooling policy uses Biome instead of ESLint or Prettier", async () => {
	for (const file of forbiddenConfigFiles) {
		assert.equal(existsSync(file), false, `${file} should not exist`);
	}

	const packageJson = JSON.parse(await readFile("package.json", "utf8"));
	const scripts = Object.values(packageJson.scripts ?? {}).join("\n");

	assert.match(scripts, /\bbiome\b/, "root scripts should call Biome");
	assert.doesNotMatch(scripts, /\beslint\b/, "root scripts should not call ESLint");
	assert.doesNotMatch(scripts, /\bprettier\b/, "root scripts should not call Prettier");
});
