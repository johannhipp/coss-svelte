import assert from "node:assert/strict";
import { test } from "node:test";
import { singleNpmPack } from "../scripts/lib/npm-pack.mjs";

test("reads one packed artifact from npm's array and package-keyed output", () => {
	const artifact = { name: "example", filename: "example-1.0.0.tgz" };
	assert.equal(singleNpmPack([artifact]).filename, artifact.filename);
	assert.equal(singleNpmPack({ example: artifact }).filename, artifact.filename);
});

test("rejects missing, ambiguous, or invalid pack results", () => {
	for (const output of [
		null,
		[],
		{},
		[{ filename: "" }],
		[{ filename: "a.tgz" }, { filename: "b.tgz" }],
	]) {
		assert.throws(() => singleNpmPack(output), /exactly one tarball/);
	}
});
