import { componentDocs, resourcePages } from "./navigation.js";

/**
 * @typedef {{ body: string; title: string }} MarkdownSection
 * @typedef {{ description: string; sections?: MarkdownSection[]; title: string }} MarkdownPage
 * @typedef {import("./types.js").ApiElement} ApiElement
 * @typedef {import("./types.js").ComponentDoc} ComponentDoc
 */

const installationCommand = "pnpm add coss-svelte bits-ui";
const themeImportCode = `<script>
</script>`;
const skillsInstallCommand = "npx skills@latest add johannhipp/skills";

const contentPages = {
	"getting-started": {
		description: "Install coss-svelte, Bits UI, and the shared theme in a SvelteKit app.",
		sections: [
			{
				body: `\`\`\`bash
${installationCommand}
\`\`\``,
				title: "Install",
			},
			{
				body: `Import the COSS theme once in the app layout so local components receive the same token system as the docs previews.

\`\`\`svelte
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
			"A Svelte-native component library inspired by coss ui. Built for SvelteKit apps, local previews, and components you can understand and own.",
		sections: [
			{
				body: "The local coss-svelte docs are scoped to Svelte components in this repo. Sidebar links open local SvelteKit routes, and every component page renders a local preview instead of sending you back to the COSS React docs.",
				title: "How It Works",
			},
			{
				body: "COSS uses Base UI for its React primitives. coss-svelte maps that component language onto Bits UI and Svelte-native components.",
				title: "Built on Bits UI, Designed for Svelte",
			},
			{
				body: "Primitives are accessible building blocks. Particles are local examples assembled from those primitives.",
				title: "Primitives and Particles",
			},
		],
		title: "Introduction",
	},
	llms: {
		description:
			"A compact local map of the coss-svelte component surface for agents and implementation work.",
		sections: [
			{
				body: "Use `/llms.txt` as the entry point. It links to raw Markdown pages for overview docs, resources, and every component route.",
				title: "Agent Entry Points",
			},
			{
				body: "Component Markdown routes use `/docs/components/<slug>.md`. Resource routes use `/docs/<slug>.md`.",
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
				body: "Choose the coss-svelte skill during install. It covers component discovery, Svelte/Bits UI composition, Tailwind 4 styling, form patterns, migration traps from React COSS or shadcn/Radix, and the current stable/experimental/deferred component statuses.",
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
								? `| \`${escapeTableCell(prop.name)}\` | \`${escapeTableCell(prop.type)}\` | ${
										prop.default !== undefined ? `\`${escapeTableCell(prop.default)}\`` : "-"
									} | ${escapeTableCell(prop.description)} |`
								: `| \`${escapeTableCell(prop.name)}\` | \`${escapeTableCell(prop.type)}\` | ${escapeTableCell(prop.description)} |`
						),
					].join("\n")
				: "";

			return `### ${element.name}

${element.description}${table ? `\n\n${table}` : ""}`;
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

	return `# ${component.title}

${component.description}

## Installation

${codeBlock("bash", installationCommand)}

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
- Prefer local coss-svelte docs and examples over React COSS snippets.
- Preserve Svelte-native and Bits UI composition rules when adapting examples.
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

	return `# coss-svelte

**coss-svelte** is a Svelte 5, copy-and-own component library inspired by COSS UI. It maps the COSS component language onto SvelteKit, Bits UI, and Tailwind CSS 4.

## Overview

${overview.join("\n")}

## Components

${components.join("\n")}

## Resources

${resources.join("\n")}
`;
}

export const docsMarkdownPages = contentPages;
