import assert from "node:assert/strict";
import { test } from "node:test";

import {
	componentMetadata,
	componentStatus,
	deferredComponents,
	experimentalComponents,
	stableComponents,
} from "../packages/coss-svelte/src/metadata.js";
import { registryItems } from "../packages/registry/src/index.js";

test("component metadata covers every scoped component", () => {
	const expected = [...stableComponents, ...experimentalComponents, ...deferredComponents].sort();

	assert.deepEqual(
		Object.keys(componentMetadata).sort(),
		expected,
		"metadata should cover stable, experimental, and deferred components"
	);

	for (const name of expected) {
		const item = componentMetadata[name];

		assert.equal(item.name, name, `${name} metadata keeps canonical name`);
		assert.equal(
			item.status,
			componentStatus[name],
			`${name} metadata status matches componentStatus`
		);
		assert.match(item.slug, /^[a-z0-9-]+$/, `${name} has a kebab-case slug`);
		assert.ok(item.title, `${name} has a title`);
		assert.ok(item.category, `${name} has a category`);
		assert.ok(item.foundation, `${name} has a foundation`);
		assert.ok(item.tier, `${name} has a tier`);
		assert.ok(
			item.docsUrl.startsWith("https://coss.com/ui/docs/components/"),
			`${name} has COSS docs URL`
		);
		assert.equal(typeof item.particles, "number", `${name} has particle count`);
	}
});

test("registry items follow the ADR-004 shape", () => {
	assert.equal(registryItems.length, Object.keys(componentMetadata).length);

	for (const item of registryItems) {
		const source = componentMetadata[item.name];

		assert.equal(item.type, "registry:ui", `${item.name} is a ui registry item`);
		assert.ok(item.title, `${item.name} has a title`);
		assert.ok(item.description, `${item.name} has a description`);
		assert.ok(Array.isArray(item.files), `${item.name} has files array`);
		assert.ok(Array.isArray(item.dependencies), `${item.name} has dependencies array`);
		assert.ok(Array.isArray(item.devDependencies), `${item.name} has devDependencies array`);
		assert.ok(
			Array.isArray(item.registryDependencies),
			`${item.name} has registryDependencies array`
		);
		assert.ok(item.cssVars && typeof item.cssVars === "object", `${item.name} has cssVars object`);
		assert.ok(item.meta && typeof item.meta === "object", `${item.name} has meta object`);
		assert.ok(Array.isArray(item.categories), `${item.name} has categories array`);
		assert.ok(
			item.docs?.startsWith("https://coss.com/ui/docs/components/"),
			`${item.name} has docs URL`
		);
		assert.equal(
			item.meta.status,
			source?.status,
			`${item.name} meta status matches source metadata`
		);
		assert.equal(
			item.meta.foundation,
			source?.foundation,
			`${item.name} meta foundation matches source metadata`
		);

		if (item.meta.status === "deferred") {
			assert.deepEqual(item.files, [], `${item.name} deferred item has no installable files`);
		} else {
			assert.ok(item.files.length > 0, `${item.name} installable item has files`);
			for (const file of item.files) {
				assert.equal(file.type, "registry:ui", `${item.name} file type is registry:ui`);
				assert.ok(
					file.path.startsWith("packages/coss-svelte/src/"),
					`${item.name} file path points to source`
				);
				assert.ok(
					file.target.startsWith("components/"),
					`${item.name} file target points to component output`
				);
			}
		}
	}
});
