import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { componentMetadata } from "../packages/coss-svelte/src/metadata.js";
import { primitiveWrapperInventory } from "../packages/coss-svelte/tests/types/primitive-wrapper-inventory.js";
import {
	aliasType,
	assertHostPathFree,
	bindingNamesFromDeclaration,
	createVirtualTypeProgram,
	formatTypeDiagnostics,
	generatedOutputIsCurrent,
	portalOptionsType,
	propertyFact,
	requiredPropertyFact,
	signatureForBranch,
} from "./lib/api-reference-generator.mjs";

const repositoryRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const packageRoot = join(repositoryRoot, "packages/coss-svelte");
const declarationsPath = join(packageRoot, "dist/index.d.ts");
const componentSourceDirectory = join(packageRoot, "src/components");
const contractsPath = join(repositoryRoot, "apps/www/src/lib/docs/api-contracts.js");
const outputPath = join(repositoryRoot, "apps/www/src/lib/docs/api-reference.generated.js");
const virtualPath = join(packageRoot, "__api_reference__.virtual.ts");
const checkMode = process.argv.includes("--check");

function formatGeneratedModule(source) {
	const result = spawnSync("pnpm", ["exec", "biome", "format", "--stdin-file-path", outputPath], {
		cwd: repositoryRoot,
		encoding: "utf8",
		input: source,
	});

	if (result.error) throw result.error;
	if (result.status !== 0) {
		throw new Error(`Biome could not format the generated API reference.\n${result.stderr}`);
	}
	return result.stdout;
}

if (!existsSync(declarationsPath)) {
	throw new Error(
		"Package declarations are missing. Run `pnpm package:prepare` before generating the API reference."
	);
}

const { apiContracts } = await import(pathToFileURL(contractsPath).href);
const packageManifest = JSON.parse(readFileSync(join(packageRoot, "package.json"), "utf8"));
const inventoryByComponent = new Map(
	primitiveWrapperInventory.map((entry) => [entry.component, entry])
);
const canonicalRoots = Object.keys(componentMetadata);
const canonicalElements = canonicalRoots.flatMap((root) => [
	root,
	...componentMetadata[root].parts,
]);

function assertUnique(values, label) {
	const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
	if (duplicates.length > 0) {
		throw new Error(`${label} contains duplicates: ${[...new Set(duplicates)].join(", ")}`);
	}
}

assertUnique(canonicalElements, "Canonical API anatomy");

const contractRoots = Object.keys(apiContracts);
if (
	contractRoots.length !== canonicalRoots.length ||
	contractRoots.some((root) => !canonicalRoots.includes(root))
) {
	throw new Error("Curated API contracts must cover the exact metadata root set.");
}

for (const root of canonicalRoots) {
	const expected = [root, ...componentMetadata[root].parts];
	const actual = (apiContracts[root] ?? []).map((entry) => entry.name);
	if (JSON.stringify(actual) !== JSON.stringify(expected)) {
		throw new Error(`${root} curated API anatomy does not match metadata.`);
	}
	for (const entry of apiContracts[root]) {
		if (!entry.description?.trim()) {
			throw new Error(`${entry.name} is missing a curated description.`);
		}
		for (const [name, prop] of Object.entries(entry.ownProps ?? {})) {
			if (!prop.description?.trim()) {
				throw new Error(`${entry.name}.${name} is missing a curated description.`);
			}
			if ("type" in prop) {
				throw new Error(
					`${entry.name}.${name} has a hand-authored type. Types must come from declarations.`
				);
			}
		}
	}
}

const virtualSource = [
	'import * as Coss from "./dist/index.js";',
	'import type { ComponentProps } from "svelte";',
	...canonicalElements.map((name) => `type Props_${name} = ComponentProps<typeof Coss.${name}>;`),
	"",
].join("\n");

const {
	checker,
	diagnostics,
	sourceFile: virtualFile,
} = createVirtualTypeProgram({
	virtualPath,
	virtualSource,
});
if (diagnostics.length > 0) {
	throw new Error(formatTypeDiagnostics(diagnostics, repositoryRoot));
}

function typeForAlias(name) {
	return aliasType(checker, virtualFile, name);
}

function bindingNames(componentName) {
	const declarationPath = join(packageRoot, "dist/components", `${componentName}.svelte.d.ts`);
	const source = readFileSync(declarationPath, "utf8");
	return bindingNamesFromDeclaration(source, componentName, declarationPath);
}

const bitsSlugByNamespace = {
	DropdownMenu: "dropdown-menu",
	LinkPreview: "link-preview",
	PinInput: "pin-input",
	RangeCalendar: "range-calendar",
};

function inheritedContract(componentName) {
	const inventory = inventoryByComponent.get(componentName);
	if (inventory) {
		const sources = inventory.propsSources.filter((source) => !source.endsWith(".Portal"));
		const effectiveSources = sources.length > 0 ? sources : inventory.propsSources;
		const [namespace, part = "root"] = effectiveSources[0].split(".");
		const slug =
			bitsSlugByNamespace[namespace] ??
			namespace.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
		return {
			label: effectiveSources.map((source) => `Bits UI ${source}`).join(" and "),
			url: `https://bits-ui.com/docs/components/${slug}#${part
				.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
				.toLowerCase()}`,
		};
	}

	const sourcePath = join(componentSourceDirectory, `${componentName}.svelte`);
	const source = readFileSync(sourcePath, "utf8");
	const tags = new Set();
	for (const match of source.matchAll(/\bHTML(Anchor|Button|Input|Textarea)Attributes\b/g)) {
		tags.add(
			{
				Anchor: "a",
				Button: "button",
				Input: "input",
				Textarea: "textarea",
			}[match[1]]
		);
	}
	for (const match of source.matchAll(/HTMLAttributes<HTML([A-Za-z]+)Element>/g)) {
		const name = match[1].replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
		tags.add(
			{
				heading: "h",
				tablecell: "td/th",
				tablerow: "tr",
				table: "table",
			}[name] ?? name
		);
	}
	if (tags.size === 0) {
		const markup = source.split("</script>").at(-1) ?? source;
		const firstNativeTag = markup.match(/<([a-z][a-z0-9]*)\b/)?.[1];
		if (firstNativeTag) tags.add(firstNativeTag);
	}
	return {
		label:
			tags.size > 0
				? `Svelte ${[...tags].map((tag) => `<${tag}>`).join(" / ")} attributes`
				: "Svelte component attributes",
		url: "https://svelte.dev/docs/svelte/basic-markup#Attributes",
	};
}

const generatedReference = {};
for (const root of canonicalRoots) {
	generatedReference[root] = apiContracts[root].map((contract) => {
		const propsAlias = typeForAlias(`Props_${contract.name}`);
		const bindings = bindingNames(contract.name);
		const props = Object.entries(contract.ownProps ?? {}).map(([name, curated]) => {
			const fact = requiredPropertyFact(
				checker,
				propsAlias.type,
				propsAlias.declaration,
				contract.name,
				name
			);
			const symbol = propsAlias.type.getProperty(name);
			const type = checker.getTypeOfSymbolAtLocation(symbol, propsAlias.declaration);
			return {
				name,
				type:
					name === "portalProps"
						? portalOptionsType(checker, type, propsAlias.declaration)
						: fact.type,
				...(curated.default !== undefined ? { default: curated.default } : {}),
				description: curated.description,
				bindable: bindings.includes(name),
			};
		});
		const facts = ["children", "child", "ref"]
			.map((name) => propertyFact(checker, propsAlias.type, propsAlias.declaration, name))
			.filter(Boolean)
			.map((fact) => ({
				...fact,
				bindable: bindings.includes(fact.name),
			}));
		const branches = propsAlias.type.isUnion() ? propsAlias.type.types : [propsAlias.type];
		const signatures = contract.signatureProps
			? [
					...new Set(
						branches.map((branch) =>
							signatureForBranch(checker, branch, propsAlias.declaration, contract.signatureProps)
						)
					),
				]
			: [];

		return {
			name: contract.name,
			description: contract.description,
			inherited: inheritedContract(contract.name),
			props,
			facts,
			bindings,
			signatures,
		};
	});
}

const generated = formatGeneratedModule(
	`/**\n * @generated by scripts/build-api-reference.mjs from coss-svelte ${packageManifest.version}\n * and Bits UI ${packageManifest.devDependencies["bits-ui"]}. Do not edit by hand.\n */\nexport const componentApiReference = ${JSON.stringify(generatedReference, null, "\t")};\n\n/** @param {string} name */\nexport function getComponentApiReference(name) {\n\tconst key = /** @type {keyof typeof componentApiReference} */ (name);\n\treturn componentApiReference[key] ?? [];\n}\n`
);

assertHostPathFree(generated, [repositoryRoot]);

if (checkMode) {
	if (
		!existsSync(outputPath) ||
		!generatedOutputIsCurrent(readFileSync(outputPath, "utf8"), generated)
	) {
		console.error("API reference is out of date. Run `pnpm api:build` after packaging.");
		process.exitCode = 1;
	} else {
		console.log("API reference is up to date");
	}
} else {
	writeFileSync(outputPath, generated);
	console.log(`Wrote declaration-derived API reference for ${canonicalElements.length} elements.`);
}
