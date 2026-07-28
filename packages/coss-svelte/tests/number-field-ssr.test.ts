import { render as renderSSR } from "svelte/server";
import { expect, test } from "vitest";
import NumberFieldSsrFixture from "./NumberFieldSsrFixture.svelte";

test("[ssr:number-field] emits deterministic spinbutton and form markup", () => {
	const { body } = renderSSR(NumberFieldSsrFixture);

	expect(body).toContain('id="server-quantity"');
	expect(body).toContain('for="server-quantity"');
	expect(body).toContain('role="spinbutton"');
	expect(body).toContain('aria-valuenow="12.5"');
	expect(body).toContain('aria-valuemin="0"');
	expect(body).toContain('aria-valuemax="99"');
	expect(body).toContain('name="quantity"');
	expect(body).toContain('value="12.5"');
	const spinbuttonIds = [...body.matchAll(/id="([^"]+)"[^>]+role="spinbutton"/gu)].map(
		(match) => match[1]
	);
	expect(spinbuttonIds).toHaveLength(3);
	expect(new Set(spinbuttonIds).size).toBe(spinbuttonIds.length);
});
