import { spawnSync } from "node:child_process";
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, sep as pathSeparator, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const packageRoot = join(root, "packages/coss-svelte");
const themeRoot = join(root, "packages/theme");
const registryItemPaths = ["button", "number-field", "context-menu"].map((slug) =>
	join(root, `apps/registry/static/r/${slug}.json`)
);

function argumentValue(name) {
	const index = process.argv.indexOf(name);
	if (index === -1) return null;
	const value = process.argv[index + 1];
	if (!value || value.startsWith("--")) throw new Error(`${name} requires a path`);
	return resolve(value);
}

const providedComponentTarball = argumentValue("--component-tarball");
const providedThemeTarball = argumentValue("--theme-tarball");
const useRegistry = process.argv.includes("--registry");
if (Boolean(providedComponentTarball) !== Boolean(providedThemeTarball)) {
	throw new Error("Provide both --component-tarball and --theme-tarball, or neither.");
}
if (useRegistry && providedComponentTarball) {
	throw new Error("Use --registry or the two tarball arguments, not both.");
}

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
	registryItems,
	themePackage,
	themeTarball,
	useRegistry,
}) {
	const dependencies = {
		"@coss-svelte/theme": useRegistry ? themePackage.version : `file:${themeTarball}`,
		"@sveltejs/adapter-node": appPackage.dependencies["@sveltejs/adapter-node"],
		"@sveltejs/kit": appPackage.dependencies["@sveltejs/kit"],
		"@sveltejs/vite-plugin-svelte": appPackage.dependencies["@sveltejs/vite-plugin-svelte"],
		"@tailwindcss/vite": appPackage.dependencies["@tailwindcss/vite"],
		"bits-ui": componentPackage.peerDependencies["bits-ui"],
		"coss-svelte": useRegistry ? componentPackage.version : `file:${componentTarball}`,
		clsx: componentPackage.dependencies.clsx,
		svelte: componentPackage.peerDependencies.svelte,
		"tailwind-merge": componentPackage.dependencies["tailwind-merge"],
		tailwindcss: appPackage.dependencies.tailwindcss,
		vite: appPackage.dependencies.vite,
	};

	for (const registryItem of registryItems) {
		for (const dependency of registryItem.dependencies) {
			if (dependency in dependencies) continue;
			throw new Error(
				`${registryItem.name} registry fixture needs an undeclared fixture version for ${dependency}.`
			);
		}
	}

	return dependencies;
}

async function writeRegistryFiles(fixtureRoot, registryItems) {
	const libRoot = join(fixtureRoot, "src/lib");
	const writtenTargets = new Map();

	for (const registryItem of registryItems) {
		for (const file of registryItem.files) {
			const target = resolve(libRoot, file.target);
			const relativeTarget = relative(libRoot, target);
			if (
				relativeTarget === "" ||
				relativeTarget === ".." ||
				relativeTarget.startsWith(`..${pathSeparator}`) ||
				isAbsolute(relativeTarget)
			) {
				throw new Error(
					`${registryItem.name} registry target escapes fixture source: ${file.target}`
				);
			}
			const existing = writtenTargets.get(target);
			if (existing !== undefined && existing.content !== file.content) {
				throw new Error(
					`Registry items ${existing.itemName} and ${registryItem.name} conflict at ${file.target}.`
				);
			}
			if (existing !== undefined) continue;
			writtenTargets.set(target, {
				content: file.content,
				itemName: registryItem.name,
			});
			await mkdir(dirname(target), { recursive: true });
			await writeFile(target, file.content);
		}
	}
}

async function createFixture(fixtureRoot, input) {
	await mkdir(join(fixtureRoot, "src/routes"), { recursive: true });
	await writeRegistryFiles(fixtureRoot, input.registryItems);

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
		`<script>\n\timport {\n\t\tCard,\n\t\tCardPanel,\n\t\tCardTitle,\n\t\tContextMenu as PackageContextMenu,\n\t\tContextMenuItem as PackageContextMenuItem,\n\t\tContextMenuPopup as PackageContextMenuPopup,\n\t\tContextMenuTrigger as PackageContextMenuTrigger,\n\t\tField,\n\t\tInput,\n\t\tNumberField as PackageNumberField,\n\t} from "coss-svelte";\n\timport RegistryButton from "$lib/components/Button.svelte";\n\timport RegistryContextMenu from "$lib/components/ContextMenu.svelte";\n\timport RegistryContextMenuItem from "$lib/components/ContextMenuItem.svelte";\n\timport RegistryContextMenuPopup from "$lib/components/ContextMenuPopup.svelte";\n\timport RegistryContextMenuTrigger from "$lib/components/ContextMenuTrigger.svelte";\n\timport RegistryNumberField from "$lib/components/NumberField.svelte";\n</script>\n\n<Card>\n\t<CardPanel>\n\t\t<CardTitle>Clean consumer</CardTitle>\n\t\t<Field label="Email" description="Uses the packaged Field contract.">\n\t\t\t<Input type="email" />\n\t\t</Field>\n\t\t<form>\n\t\t\t<PackageNumberField defaultValue={2} name="packageQuantity" />\n\t\t\t<RegistryNumberField defaultValue={3} name="registryQuantity" />\n\t\t</form>\n\t\t<PackageContextMenu>\n\t\t\t<PackageContextMenuTrigger tabindex={0}>Package target</PackageContextMenuTrigger>\n\t\t\t<PackageContextMenuPopup>\n\t\t\t\t<PackageContextMenuItem>Package action</PackageContextMenuItem>\n\t\t\t</PackageContextMenuPopup>\n\t\t</PackageContextMenu>\n\t\t<RegistryContextMenu>\n\t\t\t<RegistryContextMenuTrigger tabindex={0}>Registry target</RegistryContextMenuTrigger>\n\t\t\t<RegistryContextMenuPopup>\n\t\t\t\t<RegistryContextMenuItem>Registry action</RegistryContextMenuItem>\n\t\t\t</RegistryContextMenuPopup>\n\t\t</RegistryContextMenu>\n\t\t<RegistryButton>Registry button</RegistryButton>\n\t</CardPanel>\n</Card>\n`
	);
}

const tempRoot = await mkdtemp(join(tmpdir(), "coss-svelte-clean-consumer-"));
const tarballRoot = join(tempRoot, "tarballs");
const fixtureRoot = join(tempRoot, "fixture");

try {
	const [appPackage, componentPackage, themePackage, ...registryItems] = await Promise.all([
		readJson(join(root, "apps/www/package.json")),
		readJson(join(packageRoot, "package.json")),
		readJson(join(themeRoot, "package.json")),
		...registryItemPaths.map((path) => readJson(path)),
	]);
	let componentTarball = providedComponentTarball;
	let themeTarball = providedThemeTarball;
	if (!useRegistry) {
		await mkdir(tarballRoot);
		componentTarball ??= pack(packageRoot, tarballRoot);
		themeTarball ??= pack(themeRoot, tarballRoot);
		await Promise.all([access(componentTarball), access(themeTarball)]);
	}

	await createFixture(fixtureRoot, {
		appPackage,
		componentPackage,
		componentTarball,
		registryItems,
		themePackage,
		themeTarball,
		useRegistry,
	});

	run("pnpm", ["install", "--ignore-scripts"], { cwd: fixtureRoot });
	run("pnpm", ["exec", "svelte-kit", "sync"], { cwd: fixtureRoot });
	run("pnpm", ["exec", "svelte-check", "--tsconfig", "./tsconfig.json"], { cwd: fixtureRoot });
	run("pnpm", ["exec", "vite", "build"], { cwd: fixtureRoot });
	const source = useRegistry
		? "npm registry packages"
		: `${providedComponentTarball ? "provided" : "freshly packed"} tarballs`;
	console.log(`Clean consumer passed from ${relative(root, fixtureRoot)} using ${source}.`);
} finally {
	await rm(tempRoot, { force: true, recursive: true });
}
