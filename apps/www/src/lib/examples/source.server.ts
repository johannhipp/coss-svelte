import { readFile } from "node:fs/promises";
import { componentMetadata } from "coss-svelte/metadata";

export async function readExampleSource(slug: string) {
	const metadata = Object.values(componentMetadata).find((component) => component.slug === slug);
	if (!metadata || metadata.status === "deferred") return null;

	return readFile(new URL(`${metadata.slug}.svelte`, import.meta.url), "utf8");
}
