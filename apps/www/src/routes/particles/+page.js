// @ts-nocheck
import { componentDocs } from "$lib/docs/navigation.js";

const categoryOrder = [
	"Actions",
	"Content & Display",
	"Feedback & Status",
	"Forms & Validation",
	"Layout & Navigation",
	"Overlays & Popups",
	"Selection & Input",
	"Toggle & Choice",
];

function createParticle(component) {
	const category = component.category || "Components";

	return {
		category,
		description: component.description,
		href: component.href,
		name: `p-${component.slug}-1`,
		slug: component.slug,
		status: component.status,
		statusLabel: component.statusLabel,
		title: component.title,
	};
}

export function load() {
	const particles = componentDocs.map(createParticle);
	const categories = Array.from(new Set(particles.map((particle) => particle.category))).sort(
		(a, b) => {
			const orderA = categoryOrder.indexOf(a);
			const orderB = categoryOrder.indexOf(b);

			if (orderA === -1 && orderB === -1) {
				return a.localeCompare(b);
			}

			if (orderA === -1) {
				return 1;
			}

			if (orderB === -1) {
				return -1;
			}

			return orderA - orderB;
		}
	);

	return {
		categories,
		particleCount: particles.length,
		particles,
	};
}
