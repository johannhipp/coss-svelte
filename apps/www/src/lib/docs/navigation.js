// @ts-nocheck
import {
	componentMetadata,
	componentParts,
	deferredComponents,
	experimentalComponents,
	stableComponents,
} from "coss-svelte/metadata";
import { getComponentApiReference } from "./api-reference.js";

const statusLabels = {
	deferred: "Deferred",
	experimental: "Experimental",
	stable: "Stable",
};

const overviewDocs = [
	{
		description: "What coss-svelte is, what it mirrors from COSS, and how the docs are organized.",
		href: "/docs/introduction",
		slug: "introduction",
		title: "Introduction",
	},
	{
		description: "Install the package, theme, and peer dependencies in a SvelteKit app.",
		href: "/docs/getting-started",
		slug: "getting-started",
		title: "Get Started",
	},
];

const resourceDocs = [
	{
		description: "Agent-facing docs map for the local Svelte component surface.",
		href: "/docs/llms",
		slug: "llms",
		title: "LLMs",
	},
	{
		description: "Install coss-svelte knowledge into AI coding agents.",
		href: "/docs/skills",
		slug: "skills",
		title: "Skills",
	},
];

const primaryDocs = [
	{
		description: "Start with the coss-svelte documentation.",
		href: "/docs/introduction",
		slug: "docs",
		title: "Docs",
	},
	{
		description: "Browse local particles built from the component catalog.",
		href: "/particles",
		slug: "particles",
		title: "Particles",
	},
];

const componentNames = [...stableComponents, ...experimentalComponents, ...deferredComponents];

export const componentDocs = componentNames
	.map((name) => {
		const metadata = componentMetadata[name];
		const parts = componentParts[name] ?? [];

		return {
			...metadata,
			apiReference: getComponentApiReference(name),
			href: `/docs/components/${metadata.slug}`,
			imports: [name, ...parts],
			parts,
			statusLabel: statusLabels[metadata.status],
		};
	})
	.sort((a, b) => a.title.localeCompare(b.title));

export const sidebarGroups = [
	{
		items: overviewDocs,
		title: "Overview",
	},
	{
		items: componentDocs,
		title: "Components",
	},
	{
		items: resourceDocs,
		title: "Resources",
	},
];

export const resourcePages = resourceDocs;

export const searchPages = [
	...primaryDocs.map((page) => ({ ...page, group: "Pages" })),
	...overviewDocs.map((page) => ({ ...page, group: "Overview" })),
	...componentDocs.map((page) => ({ ...page, group: "Components" })),
	...resourceDocs.map((page) => ({ ...page, group: "Resources" })),
];

export const searchGroupOrder = ["Pages", "Overview", "Components", "Resources"];

export const searchGroups = searchGroupOrder
	.map((group) => ({
		items: searchPages.filter((page) => page.group === group),
		title: group,
	}))
	.filter((group) => group.items.length > 0);

export function getComponentDoc(slug) {
	return componentDocs.find((component) => component.slug === slug);
}

export function getAdjacentComponentDocs(slug) {
	const index = componentDocs.findIndex((component) => component.slug === slug);

	return {
		next: componentDocs[index + 1] ?? null,
		previous: componentDocs[index - 1] ?? null,
	};
}

export function getPageToc(page) {
	if (!page) {
		return [];
	}

	const toc = [
		{ href: "#preview", title: "Preview" },
		{ href: "#installation", title: "Installation" },
		{ href: "#usage", title: "Usage" },
		{ href: "#anatomy", title: "Anatomy" },
		{ href: "#api-reference", title: "API Reference" },
		{ href: "#implementation-details", title: "Implementation Details" },
	];

	if (page.status !== "stable") {
		toc.push({ href: "#status", title: "Status" });
	}

	return toc;
}

export const overviewPages = overviewDocs;
