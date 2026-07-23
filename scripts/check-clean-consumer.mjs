import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const packageRoot = join(root, "packages/coss-svelte");
const themeRoot = join(root, "packages/theme");
const registryItemPath = join(root, "apps/registry/static/r/button.json");

function run(command, args, options = {}) {
	const result = spawnSync(command, args, {
		cwd: options.cwd ?? root,
		encoding: "utf8",
		stdio: "pipe",
	});

	if (result.status !== 0) {
		throw new Error(
			`${command} ${args.join(" ")} failed.\n${result.stdout}\n${result.stderr}`.trim()
		);
	}

	return result.stdout;
}

async function readJson(path) {
	return JSON.parse(await readFile(path, "utf8"));
}

function pack(directory, destination) {
	const result = JSON.parse(
		run("npm", ["pack", "--json", "--ignore-scripts", "--pack-destination", destination], {
			cwd: directory,
		})
	);
	return join(destination, result[0].filename);
}

function fixtureDependencies({
	appPackage,
	componentPackage,
	componentTarball,
	registryItem,
	themeTarball,
}) {
	const dependencies = {
		"@coss-svelte/theme": `file:${themeTarball}`,
		"@sveltejs/adapter-node": appPackage.dependencies["@sveltejs/adapter-node"],
		"@sveltejs/kit": appPackage.dependencies["@sveltejs/kit"],
		"@sveltejs/vite-plugin-svelte": appPackage.dependencies["@sveltejs/vite-plugin-svelte"],
		"@tailwindcss/vite": appPackage.dependencies["@tailwindcss/vite"],
		"bits-ui": componentPackage.peerDependencies["bits-ui"],
		"coss-svelte": `file:${componentTarball}`,
		clsx: componentPackage.dependencies.clsx,
		svelte: componentPackage.peerDependencies.svelte,
		"tailwind-merge": componentPackage.dependencies["tailwind-merge"],
		tailwindcss: appPackage.dependencies.tailwindcss,
		vite: appPackage.dependencies.vite,
	};

	for (const dependency of registryItem.dependencies) {
		if (dependency in dependencies) continue;
		throw new Error(`Registry fixture needs an undeclared fixture version for ${dependency}.`);
	}

	return dependencies;
}

async function writeRegistryFiles(fixtureRoot, registryItem) {
	const libRoot = join(fixtureRoot, "src/lib");

	for (const file of registryItem.files) {
		const target = resolve(libRoot, file.target);
		if (!target.startsWith(`${libRoot}/`)) {
			throw new Error(`Registry item target escapes fixture source: ${file.target}`);
		}
		await mkdir(dirname(target), { recursive: true });
		await writeFile(target, file.content);
	}
}

async function createFixture(fixtureRoot, input) {
	await mkdir(join(fixtureRoot, "src/routes"), { recursive: true });
	await writeRegistryFiles(fixtureRoot, input.registryItem);

	await writeFile(
		join(fixtureRoot, "package.json"),
		`${JSON.stringify(
			{
				name: "coss-svelte-clean-consumer",
				private: true,
				type: "module",
				dependencies: fixtureDependencies(input),
				devDependencies: {
					"@types/node": input.appPackage.devDependencies["@types/node"],
					"svelte-check": input.appPackage.devDependencies["svelte-check"],
				},
			},
			null,
			2
		)}\n`
	);
	await writeFile(
		join(fixtureRoot, "svelte.config.js"),
		`import adapter from "@sveltejs/adapter-node";\n\nexport default { kit: { adapter: adapter() } };\n`
	);
	await writeFile(
		join(fixtureRoot, "vite.config.js"),
		`import { sveltekit } from "@sveltejs/kit/vite";\nimport tailwindcss from "@tailwindcss/vite";\nimport { defineConfig } from "vite";\n\nexport default defineConfig({ plugins: [tailwindcss(), sveltekit()] });\n`
	);
	await writeFile(
		join(fixtureRoot, "tsconfig.json"),
		`${JSON.stringify(
			{
				extends: "./.svelte-kit/tsconfig.json",
				compilerOptions: { allowJs: true, checkJs: true, skipLibCheck: true, strict: true },
			},
			null,
			2
		)}\n`
	);
	await writeFile(
		join(fixtureRoot, "src/app.html"),
		`<!doctype html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" />%sveltekit.head%</head><body>%sveltekit.body%</body></html>\n`
	);
	await writeFile(
		join(fixtureRoot, "src/app.css"),
		`@import "tailwindcss";\n@import "@coss-svelte/theme/style-coss.css";\n`
	);
	await writeFile(
		join(fixtureRoot, "src/routes/+layout.svelte"),
		`<script>\n\timport "../app.css";\n</script>\n\n<slot />\n`
	);
	await writeFile(
		join(fixtureRoot, "src/routes/+page.svelte"),
		`<script>\n\timport { Card, CardPanel, CardTitle, Field, Input } from "coss-svelte";\n\timport Button from "$lib/components/Button.svelte";\n</script>\n\n<Card>\n\t<CardPanel>\n\t\t<CardTitle>Clean consumer</CardTitle>\n\t\t<Field label="Email" description="Uses the packaged Field contract.">\n\t\t\t<Input type="email" />\n\t\t</Field>\n\t\t<Button>Registry button</Button>\n\t</CardPanel>\n</Card>\n`
	);
}

const tempRoot = await mkdtemp(join(tmpdir(), "coss-svelte-clean-consumer-"));
const tarballRoot = join(tempRoot, "tarballs");
const fixtureRoot = join(tempRoot, "fixture");

try {
	await mkdir(tarballRoot);
	const [appPackage, componentPackage, registryItem] = await Promise.all([
		readJson(join(root, "apps/www/package.json")),
		readJson(join(packageRoot, "package.json")),
		readJson(registryItemPath),
	]);
	const componentTarball = pack(packageRoot, tarballRoot);
	const themeTarball = pack(themeRoot, tarballRoot);

	await createFixture(fixtureRoot, {
		appPackage,
		componentPackage,
		componentTarball,
		registryItem,
		themeTarball,
	});

	run("pnpm", ["install", "--ignore-scripts"], { cwd: fixtureRoot });
	run("pnpm", ["exec", "svelte-kit", "sync"], { cwd: fixtureRoot });
	run("pnpm", ["exec", "svelte-check", "--tsconfig", "./tsconfig.json"], { cwd: fixtureRoot });
	run("pnpm", ["exec", "vite", "build"], { cwd: fixtureRoot });
	console.log(`Clean consumer passed from ${relative(root, fixtureRoot)}.`);
} finally {
	await rm(tempRoot, { force: true, recursive: true });
}
