import { componentDocs } from "$lib/docs/navigation.js";

/** @typedef {import("$lib/docs/types.js").LocalExample} LocalExample */

/** @param {typeof componentDocs[number]} component */
function createLocalExample(component) {
	const name = `${component.slug}-example`;

	/** @type {LocalExample} */
	return {
		description: component.description,
		href: component.href,
		name,
		registryUrl: `/r/${component.slug}.json`,
		slug: component.slug,
		title: component.title,
	};
}

export function load() {
	const particles = componentDocs
		.filter((component) => component.status !== "deferred")
		.map(createLocalExample);

	return {
		particleCount: particles.length,
		particles,
	};
}
