import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const cacheRoot = path.join(root, ".cache", "upstream");

const repos = [
	{
		name: "coss",
		url: "https://github.com/cosscom/coss.git",
		sparse: ["apps/ui", "apps/www"],
	},
	{
		name: "shadcn-svelte",
		url: "https://github.com/huntabyte/shadcn-svelte.git",
		sparse: [
			"docs/src/lib/registry/ui",
			"docs/src/lib/registry/styles",
			"docs/src/lib/registry/examples",
			"docs/scripts",
			"packages/cli",
			"packages/registry",
			"registry-template",
		],
	},
	{
		name: "bits-ui",
		url: "https://github.com/huntabyte/bits-ui.git",
		sparse: ["docs", "packages/bits-ui/src"],
	},
];

function run(command, args, options = {}) {
	execFileSync(command, args, {
		stdio: "inherit",
		...options,
	});
}

function cloneOrUpdate(repo) {
	const target = path.join(cacheRoot, repo.name);
	if (!fs.existsSync(path.join(target, ".git"))) {
		fs.rmSync(target, { recursive: true, force: true });
		run("git", ["clone", "--depth=1", "--filter=blob:none", "--sparse", repo.url, target]);
	} else {
		run("git", ["fetch", "--depth=1", "origin", "main"], { cwd: target });
		run("git", ["checkout", "origin/main"], { cwd: target });
	}

	run("git", ["sparse-checkout", "set", ...repo.sparse], { cwd: target });
}

fs.mkdirSync(cacheRoot, { recursive: true });

for (const repo of repos) {
	cloneOrUpdate(repo);
}

const cossLlmsTarget = path.join(cacheRoot, "coss-llms.txt");
const cossLlms = await fetch("https://coss.com/ui/llms.txt").then((response) => {
	if (!response.ok) throw new Error(`Failed to fetch coss llms.txt: ${response.status}`);
	return response.text();
});
fs.writeFileSync(cossLlmsTarget, cossLlms);

const cossSkillReferenceSource = path.join(os.homedir(), ".agents", "skills", "coss", "references");
const cossSkillReferenceTarget = path.join(cacheRoot, "coss-skill-references");
const hasCossSkillReferences = fs.existsSync(cossSkillReferenceSource);
if (hasCossSkillReferences) {
	fs.rmSync(cossSkillReferenceTarget, { recursive: true, force: true });
	fs.cpSync(cossSkillReferenceSource, cossSkillReferenceTarget, { recursive: true });
}

const manifest = {
	generatedAt: new Date().toISOString(),
	repos: Object.fromEntries(
		repos.map((repo) => {
			const target = path.join(cacheRoot, repo.name);
			const rev = execFileSync("git", ["rev-parse", "--short", "HEAD"], {
				cwd: target,
				encoding: "utf8",
			}).trim();
			return [repo.name, { url: repo.url, rev, sparse: repo.sparse }];
		})
	),
	web: {
		cossLlms: "https://coss.com/ui/llms.txt",
		localPath: path.relative(root, cossLlmsTarget),
	},
	local: {
		cossSkillReferences: hasCossSkillReferences
			? path.relative(root, cossSkillReferenceTarget)
			: null,
	},
};

fs.writeFileSync(
	path.join(cacheRoot, "manifest.json"),
	JSON.stringify(manifest, null, "\t") + "\n"
);

console.log(`Upstream references cached in ${path.relative(process.cwd(), cacheRoot)}`);
