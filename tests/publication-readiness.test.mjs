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
	for (const file of [
		"README.md",
		"apps/www/README.md",
		"packages/coss-svelte/README.md",
		"packages/coss-svelte/src/README.md",
		"packages/theme/README.md",
		"packages/theme/src/README.md",
		"packages/registry/README.md",
	]) {
		const content = await readFile(file, "utf8");

		assert.doesNotMatch(content, /Implementation has not started/i, `${file} is stale`);
		assert.doesNotMatch(content, /No tokens have been implemented yet/i, `${file} is stale`);
		assert.doesNotMatch(content, /will live here/i, `${file} is stale`);
	}
});

test("docs app has an explicit production server target", async () => {
	const config = await readFile("apps/www/svelte.config.js", "utf8");
	const packageJson = await readJson("apps/www/package.json");
	const workspace = await readFile("pnpm-workspace.yaml", "utf8");

	assert.match(config, /adapter-node/);
	assert.doesNotMatch(config, /adapter-auto/);
	assert.equal(packageJson.scripts.start, "node build");
	assert.match(workspace, /sharp:\s*true/);
});

test("generated visual evidence is not tracked in the repository", async () => {
	const gitLsFiles = spawnSync("git", ["ls-files"], { encoding: "utf8" });
	assert.equal(gitLsFiles.status, 0, gitLsFiles.stderr);

	const trackedFiles = gitLsFiles.stdout.trim().split("\n").filter(Boolean);
	const generatedEvidence = trackedFiles.filter((file) =>
		file.startsWith("docs/implementation/visual-parity/")
	);
	const trackedMedia = trackedFiles.filter((file) =>
		/\.(?:png|jpe?g|gif|webp|mp4|mov|zip|tgz|tar|gz)$/i.test(file)
	);

	assert.deepEqual(generatedEvidence, [], "visual parity output belongs in ignored .cache");
	assert.deepEqual(trackedMedia, [], "generated media archives should not be tracked");

	for (const script of [
		"scripts/capture-visual-parity-evidence.mjs",
		"scripts/capture-interactive-visual-parity-evidence.mjs",
	]) {
		const content = await readFile(script, "utf8");
		assert.match(content, /\.cache\/visual-parity/, `${script} writes to ignored cache by default`);
		assert.doesNotMatch(
			content,
			/docs\/implementation\/visual-parity/,
			`${script} should not default to docs output`
		);
	}
});

test("ci validates the repo without publishing to npm", async () => {
	const workflowPath = ".github/workflows/ci.yml";
	assert.equal(existsSync(workflowPath), true, "CI workflow exists");

	const workflow = await readFile(workflowPath, "utf8");
	assert.match(workflow, /pnpm install --frozen-lockfile/);
	assert.match(workflow, /pnpm biome:ci/);
	assert.match(workflow, /pnpm check/);
	assert.match(workflow, /pnpm test/);
	assert.match(workflow, /pnpm pack:dry-run/);
	assert.doesNotMatch(workflow, /\bnpm publish\b/);
	assert.doesNotMatch(workflow, /\bpnpm publish\b/);

	const rootPackage = await readJson("package.json");
	assert.equal(
		rootPackage.scripts["pack:dry-run"],
		"pnpm --filter coss-svelte exec npm pack --dry-run"
	);
	assert.equal(
		rootPackage.scripts["release:check"],
		"pnpm biome:ci && pnpm check && pnpm package:index:check && pnpm scope:check && pnpm registry:check && pnpm theme:check && pnpm examples:check && pnpm test:type-consumer && pnpm test && pnpm --filter coss-svelte test:ssr && pnpm pack:dry-run"
	);
});
