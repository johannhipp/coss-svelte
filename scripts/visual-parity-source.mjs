import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, relative } from "node:path";

export function sourcePaths(root, slug) {
	const upstreamRoot = join(root, ".cache/upstream/coss");
	const docsPath = join(upstreamRoot, "apps/ui/content/docs/components", `${slug}.mdx`);
	const registryPath = join(upstreamRoot, "apps/ui/registry/default/ui", `${slug}.tsx`);
	const particleDir = join(upstreamRoot, "apps/ui/registry/default/particles");
	const particles = existsSync(particleDir) ? componentParticles(root, slug, particleDir) : [];

	return {
		docsPath,
		docsSource: existsSync(docsPath),
		particles,
		registryPath,
		registrySource: existsSync(registryPath),
		sourceMapped: existsSync(docsPath) && (existsSync(registryPath) || particles.length > 0),
	};
}

function componentParticles(root, slug, particleDir) {
	const result = spawnSync(
		"find",
		[particleDir, "-maxdepth", "1", "-type", "f", "-name", `p-${slug}-*.tsx`],
		{ encoding: "utf8" }
	);

	if (result.status !== 0) return [];
	return result.stdout
		.trim()
		.split("\n")
		.filter(Boolean)
		.sort()
		.map((file) => relative(root, file));
}

export function sourceNotes(sources) {
	const blocking = [];
	const informational = [];

	if (!sources.docsSource) blocking.push("upstream docs source missing");

	if (!sources.registrySource) {
		if (sources.particles.length) {
			informational.push(
				`standalone UI source absent; composition source mapped via ${sources.particles.length} particle${sources.particles.length === 1 ? "" : "s"}`
			);
		} else {
			blocking.push("upstream registry source missing");
		}
	}

	return { blocking, informational };
}
