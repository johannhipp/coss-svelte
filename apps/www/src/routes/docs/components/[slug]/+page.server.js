import { error } from "@sveltejs/kit";
import { getAdjacentComponentDocs, getComponentDoc, getPageToc } from "$lib/docs/navigation.js";
import { readExampleSource } from "$lib/examples/source.server.js";

export async function load({ params }) {
	const page = getComponentDoc(params.slug);

	if (!page) {
		error(404, "Component not found");
	}

	return {
		exampleSource: await readExampleSource(page.slug),
		next: getAdjacentComponentDocs(page.slug).next,
		page,
		previous: getAdjacentComponentDocs(page.slug).previous,
		toc: getPageToc(page),
	};
}
