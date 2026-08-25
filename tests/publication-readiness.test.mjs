import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

async function readJson(path) {
	return JSON.parse(await readFile(path, "utf8"));
}

test("publishable package exposes npm metadata and a constrained file list", async () => {
	const packageJson = await readJson("packages/coss-svelte/package.json");

	assert.equal(packageJson.name, "coss-svelte");
	assert.equal(packageJson.private, false);
	assert.equal(packageJson.license, "MIT");
	assert.match(packageJson.description, /Svelte/i);
	assert.deepEqual(packageJson.repository, {
		type: "git",
		url: "git+https://github.com/johannhipp/coss-svelte.git",
		directory: "packages/coss-svelte",
	});
	assert.deepEqual(packageJson.bugs, {
		url: "https://github.com/johannhipp/coss-svelte/issues",
	});
	assert.equal(packageJson.homepage, "https://github.com/johannhipp/coss-svelte#readme");
	assert.deepEqual(packageJson.publishConfig, { access: "public" });
	assert.deepEqual(packageJson.files, ["dist", "README.md", "LICENSE"]);
	assert.ok(packageJson.keywords.includes("svelte"), "keywords include svelte");
	assert.ok(packageJson.keywords.includes("components"), "keywords include components");

	for (const file of ["README.md", "LICENSE"]) {
		assert.equal(
			existsSync(`packages/coss-svelte/${file}`),
			true,
			`${file} ships with npm package`
		);
	}
});

test("repository documents public maintenance and manual npm release expectations", async () => {
	for (const file of ["CHANGELOG.md", "CODE_OF_CONDUCT.md", "SECURITY.md", "docs/release.md"]) {
		assert.equal(existsSync(file), true, `${file} exists`);
	}

	const releaseDocs = await readFile("docs/release.md", "utf8");
	assert.match(releaseDocs, /npm pack --dry-run/, "release docs include npm pack dry-run");
	assert.match(releaseDocs, /npm publish/, "release docs document manual npm publish");
	assert.match(releaseDocs, /Do not publish/i, "release docs keep publish manual");

	const rootReadme = await readFile("README.md", "utf8");
	assert.doesNotMatch(rootReadme, /does not contain component implementations/i);
	assert.match(rootReadme, /pnpm release:check/, "README documents the release check");
});

test("public-facing docs do not describe implemented packages as empty scaffolds", async () => {
	for (const file of ["README.md", "packages/coss-svelte/README.md", "packages/theme/README.md"]) {
		const content = await readFile(file, "utf8");

		assert.doesNotMatch(content, /Implementation has not started/i, `${file} is stale`);
		assert.doesNotMatch(content, /No tokens have been implemented yet/i, `${file} is stale`);
		assert.doesNotMatch(content, /will live here/i, `${file} is stale`);
	}
});

test("package and getting-started docs use the public theme contract", async () => {
	const packageReadme = await readFile("packages/coss-svelte/README.md", "utf8");
	const gettingStarted = await readFile(
		"apps/www/src/routes/docs/getting-started/+page.svelte",
		"utf8"
	);
	const markdown = await readFile("apps/www/src/lib/docs/markdown.js", "utf8");
	const appCss = await readFile("apps/www/src/app.css", "utf8");

	for (const content of [packageReadme, gettingStarted, markdown]) {
		assert.match(content, /@coss-svelte\/theme/);
		assert.match(content, /style-coss\.css/);
	}

	assert.match(appCss, /@import "@coss-svelte\/theme\/style-coss\.css"/);
});

test("docs app has explicit local and Vercel production targets", async () => {
	const config = await readFile("apps/www/svelte.config.js", "utf8");
	const packageJson = await readJson("apps/www/package.json");
	const rootPackageJson = await readJson("package.json");
	const vercelConfig = await readJson("vercel.json");
	const workspace = await readFile("pnpm-workspace.yaml", "utf8");

	assert.match(config, /adapter-node/);
	assert.match(config, /adapter-vercel/);
	assert.doesNotMatch(config, /adapter-auto/);
	assert.match(config, /process\.env\.VERCEL === "1"/);
	assert.match(config, /assets:\s*"\.\.\/registry\/static"/);
	assert.equal(packageJson.scripts.start, "node build");
	assert.equal(vercelConfig.framework, "sveltekit");
	assert.equal(vercelConfig.buildCommand, "pnpm vercel:build");
	assert.equal(vercelConfig.installCommand, "pnpm install --frozen-lockfile");
	assert.match(rootPackageJson.scripts["vercel:build"], /package:prepare/);
	assert.match(rootPackageJson.scripts["vercel:build"], /prepare-vercel-output/);
	assert.match(workspace, /esbuild:\s*true/);
	assert.match(workspace, /sharp:\s*true/);
});

test("tracked content does not reference upstream coss domains", async () => {
	const gitLsFiles = spawnSync("git", ["ls-files"], { encoding: "utf8" });
	assert.equal(gitLsFiles.status, 0, gitLsFiles.stderr);

	const banned = [
		["coss", ".", "com"].join(""),
		["coss", "com"].join(""),
		["coss-svelte", ".", "dev"].join(""),
	];
	const trackedFiles = gitLsFiles.stdout.trim().split("\n").filter(Boolean);
	const offenders = [];

	for (const file of trackedFiles) {
		if (!existsSync(file)) continue;
		const content = await readFile(file, "utf8");
		if (banned.some((value) => content.toLowerCase().includes(value))) offenders.push(file);
	}

	assert.deepEqual(offenders, [], "all coss links should stay within coss-svelte");
});

test("ci validates the repo without publishing to npm", async () => {
	const workflowPath = ".github/workflows/ci.yml";
	assert.equal(existsSync(workflowPath), true, "CI workflow exists");

	const workflow = await readFile(workflowPath, "utf8");
	assert.match(workflow, /pnpm install --frozen-lockfile/);
	assert.match(workflow, /playwright install --with-deps chromium/);
	assert.match(workflow, /pnpm release:check/);
	assert.doesNotMatch(workflow, /\bnpm publish\b/);
	assert.doesNotMatch(workflow, /\bpnpm publish\b/);

	const rootPackage = await readJson("package.json");
	assert.equal(
		rootPackage.scripts["pack:dry-run"],
		"pnpm --filter coss-svelte exec npm pack --dry-run"
	);
	assert.equal(
		rootPackage.scripts["test:consumer"],
		"pnpm package:prepare && node scripts/check-clean-consumer.mjs"
	);
	assert.equal(
		rootPackage.scripts["test:browser"],
		"pnpm --filter @coss-svelte/www build && pnpm test:browser:built"
	);
	assert.equal(rootPackage.scripts["test:browser:built"], "node scripts/smoke-docs-browser.mjs");
	assert.equal(
		rootPackage.scripts["test:browser:components"],
		"pnpm --filter @coss-svelte/www build && node scripts/smoke-docs-browser.mjs --suite components"
	);
	assert.equal(
		rootPackage.scripts["docs:release-gate"],
		"pnpm --filter @coss-svelte/www build && pnpm docs:smoke:built && pnpm test:browser:built"
	);
	assert.equal(
		rootPackage.scripts["release:check"],
		"pnpm package:prepare && pnpm api:check && pnpm biome:ci && pnpm check && pnpm package:index:check && pnpm registry:check && pnpm theme:check && pnpm examples:check && pnpm test:type-consumer && pnpm test:consumer && pnpm test && pnpm --filter coss-svelte test:ssr && pnpm docs:release-gate && pnpm pack:dry-run"
	);
});
