// @ts-nocheck
import { componentDocs } from "$lib/docs/navigation.js";

function createParticle(component) {
	const name = `p-${component.slug}-1`;

	return {
		description: component.description,
		href: component.href,
		name,
		registryUrl: `https://coss.com/ui/r/${name}.json`,
		slug: component.slug,
		title: component.title,
	};
}

export function load() {
	const particles = componentDocs.map(createParticle);

	return {
		particleCount: particles.length,
		particles,
	};
}
