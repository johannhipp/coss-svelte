import { render as renderSSR } from "svelte/server";
import { expect, test } from "vitest";
import FieldFixture from "./FieldFixture.svelte";

test("Field keeps generated associations in SSR markup", () => {
	const { body } = renderSSR(FieldFixture);
	expect(body).toContain('for="');
	expect(body).toContain('aria-describedby="');
	expect(body).toContain('aria-invalid="true"');
});
