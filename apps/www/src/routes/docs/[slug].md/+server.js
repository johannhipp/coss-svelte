import { error } from "@sveltejs/kit";
import { getContentMarkdown } from "$lib/docs/markdown.js";

export function GET({ params }) {
	const markdown = getContentMarkdown(params.slug);

	if (!markdown) {
		error(404, "Docs page not found");
	}

	return new Response(markdown, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}
