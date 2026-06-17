import {
	componentMetadata,
	componentParts,
	componentStatus,
	deferredComponents,
	experimentalComponents,
	stableComponents,
} from "coss-svelte/metadata";

const themeCssVars = {
	"--cn-background": "#f7f7f4",
	"--cn-foreground": "#171717",
	"--cn-surface": "#ffffff",
	"--cn-border": "#deded6",
	"--cn-primary": "#111111",
	"--cn-radius": "0.5rem",
};

const bitsBackedCompoundComponents = new Set([
	"Autocomplete",
	"Command",
	"Drawer",
	"Menu",
	"Sheet",
]);

function componentFiles(metadata) {
	if (metadata.status === "deferred") {
		return [];
	}

	return [metadata.name, ...(componentParts[metadata.name] ?? [])].map((name) => ({
		path: `packages/coss-svelte/src/components/${name}.svelte`,
		target: `components/${name}.svelte`,
		type: "registry:ui",
	}));
}

function componentDependencies(metadata) {
	if (
		metadata.status !== "deferred" &&
		(metadata.foundation === "bits" || bitsBackedCompoundComponents.has(metadata.name))
	) {
		return ["bits-ui"];
	}

	return [];
}

export const registryItems = Object.values(componentMetadata).map((metadata) => ({
	name: metadata.name,
	title: metadata.title,
	description: metadata.description,
	type: "registry:ui",
	files: componentFiles(metadata),
	dependencies: componentDependencies(metadata),
	devDependencies: [],
	registryDependencies: [],
	cssVars: themeCssVars,
	meta: {
		status: metadata.status,
		foundation: metadata.foundation,
		particlePriority: metadata.particlePriority,
		slug: metadata.slug,
	},
	categories: [metadata.category],
	docs: metadata.docsUrl,
}));

export {
	componentMetadata,
	componentParts,
	componentStatus,
	deferredComponents,
	experimentalComponents,
	stableComponents,
};
