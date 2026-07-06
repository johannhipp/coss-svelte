import { createLlmsTxt } from "$lib/docs/markdown.js";

export function GET({ url }) {
	return new Response(createLlmsTxt({ baseUrl: url.origin }), {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
}
