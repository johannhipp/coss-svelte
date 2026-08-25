import { componentDocs, resourcePages } from "./navigation.js";

/**
 * @typedef {{ body: string; title: string }} MarkdownSection
 * @typedef {{ description: string; sections?: MarkdownSection[]; title: string }} MarkdownPage
 * @typedef {import("./types.js").ApiElement} ApiElement
 * @typedef {import("./types.js").ComponentDoc} ComponentDoc
 */

const sourceSetupCommand = `pnpm install --frozen-lockfile
pnpm package:prepare`;
const availabilityCheckCommand = `npm view coss-svelte version
npm view @coss-svelte/theme version`;
const installationCommand = "pnpm add coss-svelte bits-ui @coss-svelte/theme";
const themeImportCode = `@import "tailwindcss";
@import "@coss-svelte/theme/style-coss.css";`;
const skillsInstallCommand = "npx skills@latest add johannhipp/skills --skill coss-svelte";

const contentPages = {
	"getting-started": {
		description:
			"Use coss-svelte from the source workspace today, or verify package publication before installing it in another SvelteKit app.",
		sections: [
			{
				body: `\`\`\`bash
${sourceSetupCommand}
\`\`\``,
				title: "Source Setup",
			},
			{
				body: `The packages are not published yet. Before using an external package install, verify both packages exist:

\`\`\`bash
${availabilityCheckCommand}
\`\`\`

After both checks succeed, install the package, its Bits UI peer, and the shared theme:

\`\`\`bash
${installationCommand}
\`\`\``,
				title: "External Availability",
			},
			{
				body: `Import the COSS theme once from the global stylesheet loaded by your app layout so local components receive the same token system as the docs previews.

					\`\`\`css
${themeImportCode}
\`\`\``,
				title: "Theme",
			},
			{
				body: "Use the [coss-svelte skill](/docs/skills) when an agent needs implementation rules for Svelte, Bits UI, Tailwind CSS 4, and the current component status boundaries.\n\ncoss-svelte exposes a local docs map at [`/llms.txt`](/llms.txt), raw Markdown routes for component pages, and Copy Markdown actions for page-level context.",
				title: "Getting your agents to use coss-svelte",
			},
		],
		title: "Getting Started",
	},
	introduction: {
		description:
			"coss-svelte is a Svelte 5-native component library that tries to mimic [coss ui](https://coss.com/ui/docs). Built for SvelteKit apps and built on top of Bits UI.",
		sections: [
			{
				body: "Svelte 5 is highly performant, and I want to see it used more. But polished Svelte component libraries are scarce because React and Next.js patterns do not translate cleanly. coss-svelte aims to fill that gap on Svelte's own terms.",
				title: "Why?",
			},
			{
				body: "COSS builds its React primitives on Base UI. coss-svelte brings the same component language and compact visual shell to native Svelte, using Bits UI for accessible behavior, keyboard interactions, and focus management.",
				title: "Built on Bits UI, Designed for Svelte",
			},
			{
				body: "Primitives are composable Svelte building blocks such as buttons, fields, menus, and overlays. Particles combine them into practical examples. Browse Particles for context; open a component page for its source, metadata, and implementation notes.",
				title: "Primitives and Particles",
			},
		],
		title: "Introduction",
	},
	llms: {
		description:
			"A generated map of the current coss-svelte component, API, example, registry, and skill surface for coding agents.",
		sections: [
			{
				body: "Use `/llms.txt` as the entry point. It identifies the Svelte-specific rules and links to raw Markdown pages for overview docs, every component, the maintained skill, and machine-readable registry artifacts.",
				title: "Agent Entry Points",
			},
			{
				body: "Component Markdown routes use `/docs/components/<slug>.md` and include the live example source plus generated API tables. Resource routes use `/docs/<slug>.md`; registry manifests use `/r/<slug>.json`.",
				title: "Raw Markdown Routes",
			},
		],
		title: "LLMs",
	},
	skills: {
		description:
			"Install coss-svelte knowledge into AI coding agents so they can implement the Svelte component surface correctly.",
		sections: [
			{
				body: `\`\`\`bash
${skillsInstallCommand}
\`\`\``,
				title: "Install",
			},
			{
				body: "The coss-svelte skill covers component discovery, Svelte/Bits UI composition, Tailwind 4 styling, forms, migration traps from React COSS or shadcn/Radix, registry usage, and current stable and experimental status boundaries.",
				title: "What It Covers",
			},
			{
				body: "Use the skill when generating coss-svelte UI, migrating COSS-shaped examples to Svelte, or checking component composition rules before editing source.",
				title: "How Agents Use It",
			},
		],
		title: "Skills",
	},
};

/**
 * @param {string} baseUrl
 */
function normalizeBaseUrl(baseUrl = "") {
	return baseUrl.replace(/\/$/, "");
}

/**
 * @param {string} baseUrl
 * @param {string} href
 * @param {string} label
 * @param {string} [description]
 */
function markdownLink(baseUrl, href, label, description) {
	const url = `${normalizeBaseUrl(baseUrl)}${href}`;
	return description ? `- [${label}](${url}): ${description}` : `- [${label}](${url})`;
}

/**
 * @param {string} language
 * @param {string} code
 */
function codeBlock(language, code) {
	return `\`\`\`${language}
${code}
\`\`\``;
}

/**
 * @param {string} value
 */
function escapeTableCell(value = "") {
	return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

/**
 * @param {ApiElement[]} reference
 */
function createApiReferenceMarkdown(reference = []) {
	return reference
		.map((element) => {
			const props = element.props ?? [];
			const hasDefault = props.some((prop) => prop.default !== undefined);
			const table = props.length
				? [
						hasDefault
							? "| Prop | Type | Default | Description |"
							: "| Prop | Type | Description |",
						hasDefault ? "| --- | --- | --- | --- |" : "| --- | --- | --- |",
						...props.map((prop) =>
							hasDefault
								? `| \`${escapeTableCell(prop.bindable ? `bind:${prop.name}` : prop.name)}\` | \`${escapeTableCell(prop.type)}\` | ${
										prop.default !== undefined ? `\`${escapeTableCell(prop.default)}\`` : "-"
									} | ${escapeTableCell(prop.description)} |`
								: `| \`${escapeTableCell(prop.bindable ? `bind:${prop.name}` : prop.name)}\` | \`${escapeTableCell(prop.type)}\` | ${escapeTableCell(prop.description)} |`
						),
					].join("\n")
				: "";
			const signatures = element.signatures?.length
				? `\n\n**Signatures**\n\n${element.signatures
						.map((signature) => `- \`${escapeTableCell(signature)}\``)
						.join("\n")}`
				: "";
			const facts = element.facts?.length
				? `\n\n**Composition and refs**\n\n${element.facts
						.map(
							(fact) =>
								`- \`${fact.bindable ? `bind:${fact.name}` : fact.name}: ${escapeTableCell(fact.type)}\``
						)
						.join("\n")}`
				: "";
			const inherited = element.inherited
				? `\n\nInherits from [${element.inherited.label}](${element.inherited.url}).`
				: "";

			return `### ${element.name}

${element.description}${signatures}${table ? `\n\n${table}` : ""}${facts}${inherited}`;
		})
		.join("\n\n");
}

/**
 * @param {ComponentDoc} component
 * @param {string | null} [usageCode]
 */
export function createComponentMarkdown(component, usageCode) {
	const parts = [component.name, ...(component.parts ?? [])];
	const resolvedUsageCode =
		usageCode ?? `import { ${component.imports.join(", ")} } from "coss-svelte";`;
	const statusNote =
		component.status === "stable"
			? "Stable for the current coss-svelte surface."
			: (component.firstImplementationPass ?? component.statusLabel);

	const statusAgentNote =
		component.status === "experimental"
			? `- Treat ${component.title} as experimental and preserve the limitations described in Status.`
			: `- ${component.title} is stable in the current source catalog.`;

	return `# ${component.title}

${component.description}

## Installation

The packages are not published yet. In a coss-svelte source checkout, prepare the workspace with:

${codeBlock("bash", sourceSetupCommand)}

Before suggesting an external install, run \`${availabilityCheckCommand.split("\n").join("` and `")}\`. Only after both packages resolve should a consumer run \`${installationCommand}\`.

## Usage

${codeBlock("svelte", resolvedUsageCode)}

## Anatomy

${parts.map((part) => `- \`${part}\``).join("\n")}

## API Reference

${createApiReferenceMarkdown(component.apiReference)}

## Implementation Details

| Field | Value |
| --- | --- |
| Status | ${component.statusLabel} |
| Foundation | ${component.foundation} |
| Category | ${component.category} |
| Particles | ${component.particles} |

## Status

${statusNote}

## Agent Notes

- Import Svelte exports directly from \`coss-svelte\`.
- This is Svelte 5 code: use \`class\`, lowercase event properties, runes, snippets, and documented \`bind:*\` contracts. Do not emit JSX, React hooks, \`className\`, \`asChild\`, or Base UI imports.
- Prefer this route's example and generated API table over React COSS snippets; COSS React particles are design references only.
- Inspect the copy-and-own manifest at \`/r/${component.slug}.json\` for the complete local file and dependency closure.
${statusAgentNote}
`;
}

/**
 * @param {MarkdownPage} page
 */
export function createContentMarkdown({ description, sections = [], title }) {
	const body = sections
		.map(
			(section) => `## ${section.title}

${section.body}`
		)
		.join("\n\n");

	return `# ${title}

${description}${body ? `\n\n${body}` : ""}
`;
}

export function createSkillsMarkdown() {
	return createContentMarkdown(contentPages.skills);
}

/**
 * @param {string} slug
 */
export function getContentMarkdown(slug) {
	/** @type {Record<string, MarkdownPage>} */
	const pages = contentPages;
	const page = pages[slug];

	if (!page) {
		return null;
	}

	return createContentMarkdown(page);
}

export function createLlmsTxt({ baseUrl = "" } = {}) {
	const counts = { deferred: 0, experimental: 0, stable: 0 };
	for (const component of componentDocs) {
		if (component.status === "stable") counts.stable += 1;
		if (component.status === "experimental") counts.experimental += 1;
		if (component.status === "deferred") counts.deferred += 1;
	}
	const overview = [
		markdownLink(
			baseUrl,
			"/docs/introduction.md",
			"Introduction",
			contentPages.introduction.description
		),
		markdownLink(
			baseUrl,
			"/docs/getting-started.md",
			"Getting Started",
			contentPages["getting-started"].description
		),
	];
	const components = componentDocs.map((component) =>
		markdownLink(
			baseUrl,
			`/docs/components/${component.slug}.md`,
			component.title,
			component.description
		)
	);
	const resources = [
		...resourcePages.map((page) =>
			markdownLink(baseUrl, `${page.href}.md`, page.title, page.description)
		),
	];
	const registry = [
		markdownLink(baseUrl, "/r/index.json", "Registry index", "All generated component manifests."),
		markdownLink(
			baseUrl,
			"/schema/registry-item.json",
			"Registry item schema",
			"JSON Schema for one copy-and-own component manifest."
		),
		markdownLink(
			baseUrl,
			"/schema/registry-index.json",
			"Registry index schema",
			"JSON Schema for the registry index."
		),
	];

	return `# coss-svelte

**coss-svelte** is a Svelte 5, copy-and-own component library inspired by COSS UI. It maps the COSS component language onto SvelteKit, Bits UI, and Tailwind CSS 4.

The current catalog contains **${componentDocs.length} components**: **${counts.stable} stable**, **${counts.experimental} experimental**, and **${counts.deferred} deferred**.

## Agent Rules

- Use the maintained [coss-svelte skill](${normalizeBaseUrl(baseUrl)}/docs/skills.md) for implementation workflow and high-risk composition rules.
- Treat COSS React, Base UI, shadcn, and Radix snippets as design references only. Never copy their implementation source into Svelte.
- Import only names documented by a component Markdown route or exported by \`coss-svelte\`.
- Prefer Svelte 5 \`class\`, lowercase event properties, runes, snippets, and documented \`bind:*\` props.
- Read a component's status, example, API table, and registry manifest before generating code.
- The packages are not published yet. Work from the source repository or verify both npm packages before suggesting an external install.

## Overview

${overview.join("\n")}

## Components

${components.join("\n")}

## Machine-readable Registry

${registry.join("\n")}

## Resources

${resources.join("\n")}
`;
}

export const docsMarkdownPages = contentPages;
