import { error } from "@sveltejs/kit";
import { getAdjacentComponentDocs, getComponentDoc, getPageToc } from "$lib/docs/navigation.js";

export function load({ params }) {
	const page = getComponentDoc(params.slug);

	if (!page) {
		error(404, "Component not found");
	}

	return {
		next: getAdjacentComponentDocs(page.slug).next,
		page,
		previous: getAdjacentComponentDocs(page.slug).previous,
		toc: getPageToc(page),
	};
}
