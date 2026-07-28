import assert from "node:assert/strict";
import { join } from "node:path";
import { test } from "node:test";

import {
	aliasType,
	assertHostPathFree,
	bindingNamesFromDeclaration,
	createVirtualTypeProgram,
	formatTypeDiagnostics,
	generatedOutputIsCurrent,
	requiredPropertyFact,
	signatureForBranch,
} from "../scripts/lib/api-reference-generator.mjs";

const virtualPath = join(
	process.cwd(),
	"packages/coss-svelte/__api_reference_fixture__.virtual.ts"
);

function inspectFixture(valueType = "string") {
	const virtualSource = `
		import type { Component, ComponentProps } from "svelte";

		type Single = {
			type?: "single";
			value?: ${valueType};
			onValueChange?: (value: ${valueType}) => void;
		};
		type Multiple = {
			type: "multiple";
			value?: ${valueType}[];
			onValueChange?: (value: ${valueType}[]) => void;
		};
		declare const Fixture: Component<Single | Multiple, {}, "value">;
		type Props_Fixture = ComponentProps<typeof Fixture>;
	`;
	const result = createVirtualTypeProgram({ virtualPath, virtualSource });
	assert.equal(
		result.diagnostics.length,
		0,
		formatTypeDiagnostics(result.diagnostics, process.cwd())
	);
	const props = aliasType(result.checker, result.sourceFile, "Props_Fixture");
	return { ...result, props };
}

test("the API generator derives prop types from a virtual declaration fixture", () => {
	const stringFixture = inspectFixture("string");
	const numberFixture = inspectFixture("number");

	assert.equal(
		requiredPropertyFact(
			stringFixture.checker,
			stringFixture.props.type,
			stringFixture.props.declaration,
			"Fixture",
			"value"
		).type,
		"string | string[]"
	);
	assert.equal(
		requiredPropertyFact(
			numberFixture.checker,
			numberFixture.props.type,
			numberFixture.props.declaration,
			"Fixture",
			"value"
		).type,
		"number | number[]"
	);
});

test("the virtual fixture retains correlated single and multiple signatures", () => {
	const fixture = inspectFixture();
	assert.equal(fixture.props.type.isUnion(), true);

	const signatures = fixture.props.type.types.map((branch) =>
		signatureForBranch(fixture.checker, branch, fixture.props.declaration, [
			"type",
			"value",
			"onValueChange",
		])
	);

	assert.deepEqual(signatures, [
		'{ type?: "single"; value?: string; onValueChange?: ((value: string) => void) }',
		'{ type: "multiple"; value?: string[]; onValueChange?: ((value: string[]) => void) }',
	]);
});

test("binding extraction reads literal keys and rejects broad keys", () => {
	const declaration = `
		type Props = { value?: string; ref?: HTMLElement | null };
		declare const Fixture: import("svelte").Component<Props, {}, "value" | "ref">;
	`;
	assert.deepEqual(bindingNamesFromDeclaration(declaration, "Fixture"), ["ref", "value"]);

	assert.throws(
		() =>
			bindingNamesFromDeclaration(
				'declare const Fixture: import("svelte").Component<{}, {}, string>;',
				"Fixture"
			),
		/non-literal binding key/
	);
});

test("unknown curated props fail instead of fabricating a type", () => {
	const fixture = inspectFixture();
	assert.throws(
		() =>
			requiredPropertyFact(
				fixture.checker,
				fixture.props.type,
				fixture.props.declaration,
				"Fixture",
				"missing"
			),
		/Fixture curates unknown public prop missing/
	);
});

test("host paths and stale generated output are detected deterministically", () => {
	const generated = 'export const fixture = { type: "string" };\n';
	assert.doesNotThrow(() => assertHostPathFree(generated, [process.cwd()]));
	assert.throws(
		() => assertHostPathFree(`${generated}// ${process.cwd()}\n`, [process.cwd()]),
		/absolute host path/
	);
	assert.equal(generatedOutputIsCurrent(generated, generated), true);
	assert.equal(
		generatedOutputIsCurrent(generated, 'export const fixture = { type: "number" };\n'),
		false
	);
});
