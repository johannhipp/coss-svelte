import { componentMetadata } from "coss-svelte/metadata";
import type { Component } from "svelte";

const modules = import.meta.glob("./*.svelte") as Record<
	string,
	() => Promise<{ default: Component }>
>;

type ExampleComponent = Component;

export type ExampleResult =
	| { kind: "component"; component: ExampleComponent; slug: string }
	| { kind: "deferred"; reason: string; slug: string }
	| { kind: "missing"; slug: string };

function slugFromPath(path: string) {
	return path.slice("./".length, -".svelte".length);
}

const modulesBySlug = new Map(
	Object.entries(modules).map(([path, loader]) => [slugFromPath(path), loader])
);

export const exampleSlugs = Object.values(componentMetadata)
	.filter((component) => component.status !== "deferred")
	.map((component) => component.slug);

export async function loadExample(slug: string): Promise<ExampleResult> {
	const metadata = Object.values(componentMetadata).find((component) => component.slug === slug);
	if (!metadata) return { kind: "missing", slug };
	if (metadata.status === "deferred") {
		return { kind: "deferred", reason: metadata.firstImplementationPass, slug };
	}

	const loader = modulesBySlug.get(slug);
	if (!loader) return { kind: "missing", slug };
	const module = await loader();
	return { kind: "component", component: module.default, slug };
}
