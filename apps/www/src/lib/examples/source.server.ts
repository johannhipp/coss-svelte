import { componentMetadata } from "coss-svelte/metadata";

const rawExamples = import.meta.glob<string>("./*.svelte", {
	eager: true,
	import: "default",
	query: "?raw",
});

export async function readExampleSource(slug: string) {
	const metadata = Object.values(componentMetadata).find((component) => component.slug === slug);
	if (!metadata || metadata.status === "deferred") return null;

	const source = rawExamples[`./${metadata.slug}.svelte`];
	if (source === undefined) {
		throw new Error(
			`Implemented component "${metadata.name}" is missing its bundled example source at "./${metadata.slug}.svelte".`
		);
	}

	return source;
}
