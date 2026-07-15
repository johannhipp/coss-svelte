import fs from "node:fs";
import path from "node:path";

import { componentMetadata } from "../packages/coss-svelte/src/metadata.js";

const root = path.resolve(import.meta.dirname, "..");
const scopeDir = path.join(root, "docs", "scope");
const sourceIndex = path.join(scopeDir, "source", "00-component-index.md");
const metadataBySlug = Object.fromEntries(
	Object.values(componentMetadata).map((metadata) => [metadata.slug, metadata])
);

const slugify = (value) =>
	value
		.toLowerCase()
		.replace(/&/g, "and")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

const componentRows = fs
	.readFileSync(sourceIndex, "utf8")
	.split("\n")
	.filter((line) => line.startsWith("| ") && !line.includes("---"))
	.filter((line) => !line.includes("| Component"))
	.map((line) => {
		const cells = line
			.split("|")
			.slice(1, -1)
			.map((cell) => cell.trim());
		const docsMatch = cells[5]?.match(/\(([^)]+)\)/);
		const sourceComponent = {
			name: cells[0],
			slug: slugify(cells[0]),
			category: cells[1],
			scope: cells[2],
			particles: Number(cells[3] ?? 0),
			localPrimitiveRef: cells[4],
			liveDocs: docsMatch?.[1] ?? "",
		};
		const metadata = metadataBySlug[sourceComponent.slug];
		if (!metadata) {
			throw new Error(`Scope source has no canonical metadata entry: ${sourceComponent.name}`);
		}
		if (metadata.slug !== sourceComponent.slug) {
			throw new Error(
				`Scope slug disagrees for ${sourceComponent.name}: ${sourceComponent.slug} vs ${metadata.slug}`
			);
		}
		if (metadata.category !== sourceComponent.category) {
			throw new Error(`Scope category disagrees for ${sourceComponent.name}`);
		}
		if (metadata.particles !== sourceComponent.particles) {
			throw new Error(`Scope particle count disagrees for ${sourceComponent.name}`);
		}
		return {
			...sourceComponent,
			slug: metadata.slug,
			category: metadata.category,
			particles: metadata.particles,
			localPrimitiveRef: metadata.hasLocalPrimitiveRef ? "yes" : "no",
		};
	});

function entryFor(component) {
	const metadata = metadataBySlug[component.slug];
	return {
		foundation: metadata.foundation,
		primitive: metadata.primitive,
		tier: metadata.tier,
		outline: metadata.firstImplementationPass,
	};
}

const matrix = `# Component Implementation Matrix

Generated from the COSS scope inventory. This table is the first implementation planning surface for coss-svelte.

| Component | Category | Foundation | Tier | First implementation pass |
|---|---|---|---|---|
${componentRows
	.map((component) => {
		const entry = entryFor(component);
		return `| [${component.name}](#${slugify(component.name)}) | ${component.category} | ${entry.primitive} (${entry.foundation}) | ${entry.tier} | ${entry.outline} |`;
	})
	.join("\n")}
`;

const sections = componentRows
	.map((component) => {
		const entry = entryFor(component);
		return `## ${component.name}

- Category: ${component.category}
- COSS scope: ${component.scope}
- COSS docs: ${component.liveDocs}
- Particle examples: ${component.particles}
- Svelte foundation: ${entry.primitive} (${entry.foundation})
- Implementation tier: ${entry.tier}

Implementation outline:

1. Define the public Svelte exports and naming so examples read like COSS while following Svelte conventions.
2. ${entry.outline}
3. Preserve COSS visual tokens through shared variants, CSS variables, and data-slot selectors instead of component-local one-off styles.
4. Port the highest-signal COSS particle examples first, then add the full particle set after the primitive API is stable.
5. Verify SSR/hydration, keyboard behavior, focus management, disabled/invalid states, and Field/Form composition where relevant.

Source notes:

- Local primitive reference present: ${component.localPrimitiveRef}
- COSS live docs: ${component.liveDocs || "not found"}
`;
	})
	.join("\n");

const outline = `# Component Implementation Outline

This document expands the feature scope into implementation intent for each component. It is not component code.

The implementation strategy is to preserve COSS's visual language and copy-and-own ergonomics, while replacing the React/Base UI primitive layer with Svelte-native Bits UI or native Svelte markup.

## Composition contract

Root components use one consistent composition model: custom \`children\` snippets
always take precedence, and convenience props render an explicit fallback only
when no children are supplied. This keeps the compound-part API composable while
making small examples possible without hidden root modes. New roots must follow
the same rule, and their fallback props must be listed in the docs API reference.

The model is recorded as \`compositionModel\` in the package metadata so registry,
docs, and validation tooling can refer to the same contract. Components with
specialized payloads (for example, calendar dates or slider values) still own
their payload normalization; the shared rule governs only root content selection.

${sections.trimEnd()}
`;

const readme = `# Scope Documentation

This directory contains the coss-svelte component scope and implementation outline.

## Generated Planning Files

- [Component Implementation Matrix](component-implementation-matrix.md)
- [Component Implementation Outline](component-implementation-outline.md)

## Source Scope Files

The source directory contains the original COSS component scope inventory generated before this repository was created. Treat it as source material, not the current coss-svelte implementation plan.

## Implementation Principle

Do not port Base UI directly. Port the component contract, visual tokens, examples, and documentation shape onto Svelte-native foundations, primarily Bits UI.
`;

const generatedFiles = [
	["README.md", readme],
	["component-implementation-matrix.md", matrix],
	["component-implementation-outline.md", outline],
];
const mismatches = generatedFiles
	.filter(([name, content]) => fs.readFileSync(path.join(scopeDir, name), "utf8") !== content)
	.map(([name]) => name);

if (process.argv.includes("--check")) {
	if (mismatches.length > 0) {
		console.error(
			`Scope documentation is out of date: ${mismatches.join(", ")}. Run pnpm scope:build.`
		);
		process.exitCode = 1;
	} else {
		console.log("Scope documentation is up to date");
	}
} else {
	for (const [name, content] of generatedFiles) {
		fs.writeFileSync(path.join(scopeDir, name), content);
	}
	console.log(`Wrote ${componentRows.length} component outlines.`);
}
