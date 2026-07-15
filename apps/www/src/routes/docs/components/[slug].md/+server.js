import { error } from "@sveltejs/kit";
import { createComponentMarkdown } from "$lib/docs/markdown.js";
import { getComponentDoc } from "$lib/docs/navigation.js";
import { readExampleSource } from "$lib/examples/source.server.js";

export async function GET({ params }) {
	const page = getComponentDoc(params.slug);

	if (!page) {
		error(404, "Component not found");
	}

	return new Response(createComponentMarkdown(page, await readExampleSource(page.slug)), {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}
