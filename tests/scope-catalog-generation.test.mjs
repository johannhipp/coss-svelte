import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";

test("catalog generator check mode reports the checked-in catalog is current", () => {
	const result = spawnSync(process.execPath, ["scripts/generate-scope-catalog.mjs", "--check"], {
		encoding: "utf8",
	});

	assert.equal(result.status, 0, result.stderr || result.stdout);
	assert.match(result.stdout, /Catalog is up to date/);
	assert.doesNotMatch(result.stdout, /Wrote \d+ components/);
});

test("catalog particle counts match generated particle arrays", async () => {
	const { catalogComponents } = await import("../apps/scope-catalog/src/lib/cossCatalog.ts");
	const mismatches = catalogComponents
		.filter((component) => component.particleCount !== component.particles.length)
		.map((component) => ({
			slug: component.slug,
			particleCount: component.particleCount,
			particles: component.particles.length,
		}));

	assert.deepEqual(mismatches, []);
});
