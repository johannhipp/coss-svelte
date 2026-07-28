import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

import { componentMetadata } from "../packages/coss-svelte/src/metadata.js";
import {
	componentEvidenceRegistry,
	componentFamilies,
	componentFamilyGates,
	componentFamilyMatrix,
} from "./component-family-matrix.mjs";

const browserCases = await import("../scripts/browser/component-family-cases.mjs").catch(
	(error) => {
		throw new Error(
			`Browser evidence module is not executable: ${error instanceof Error ? error.message : String(error)}`
		);
	}
);

test("the component-family matrix covers every metadata root exactly once", () => {
	const metadataRoots = Object.keys(componentMetadata).sort();
	const matrixRoots = componentFamilyMatrix.map((row) => row.root).sort();

	assert.deepEqual(matrixRoots, metadataRoots);
	assert.equal(new Set(matrixRoots).size, matrixRoots.length, "matrix roots are unique");
});

test("matrix rows use the closed family and gate vocabularies", () => {
	const roots = new Set(Object.keys(componentMetadata));
	const families = new Set(componentFamilies);
	const gates = new Set(componentFamilyGates);

	for (const row of componentFamilyMatrix) {
		assert.ok(roots.has(row.root), `${row.root} is a known metadata root`);
		assert.ok(families.has(row.family), `${row.root} uses a known family`);
		assert.equal(typeof row.implementation, "string", `${row.root} has an implementation key`);
		assert.ok(row.implementation.length > 0, `${row.root} has a non-empty implementation key`);
		assert.ok(row.required.length > 0, `${row.root} has required gates`);
		assert.equal(
			new Set(row.required).size,
			row.required.length,
			`${row.root} does not repeat gates`
		);
		for (const gate of row.required) {
			assert.ok(gates.has(gate), `${row.root} uses known gate ${gate}`);
			assert.ok(
				Array.isArray(row.evidence[gate]) && row.evidence[gate].length > 0,
				`${row.root} ${gate} has executable evidence`
			);
		}
		assert.deepEqual(
			Object.keys(row.evidence).sort(),
			[...row.required].sort(),
			`${row.root} evidence matches its required gates`
		);
	}
});

test("every evidence ID resolves to an executable browser handler or test title", async () => {
	const referenced = new Set(
		componentFamilyMatrix.flatMap((row) => Object.values(row.evidence).flat())
	);
	const registered = new Set(Object.keys(componentEvidenceRegistry));

	for (const id of referenced) {
		assert.ok(registered.has(id), `${id} is registered`);
	}

	for (const [id, evidence] of Object.entries(componentEvidenceRegistry)) {
		assert.ok(["vitest", "ssr-vitest", "browser"].includes(evidence.runner), `${id} has a runner`);

		if (evidence.runner === "browser") {
			assert.equal(
				typeof browserCases.componentFamilyCaseHandlers[evidence.handler],
				"function",
				`${id} resolves to browser handler ${evidence.handler}`
			);
			continue;
		}

		const source = await readFile(evidence.file, "utf8");
		assert.ok(source.includes(evidence.title), `${id} resolves to a real test title`);
	}
});

test("stable roots cannot silently opt out of a gate", () => {
	for (const row of componentFamilyMatrix) {
		assert.equal("exempt" in row, false, `${row.root} has no untracked exemption`);
		if (componentMetadata[row.root].status === "stable") {
			assert.ok(row.required.includes("ssr"), `${row.root} requires SSR`);
			assert.ok(row.required.includes("hydrate"), `${row.root} requires hydration`);
			assert.ok(row.required.includes("axe"), `${row.root} requires axe`);
		}
	}
});
