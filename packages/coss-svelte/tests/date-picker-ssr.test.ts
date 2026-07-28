import { render as renderSSR } from "svelte/server";
import { expect, test } from "vitest";
import DatePickerFixture from "./DatePickerFixture.svelte";

test("[ssr:date-picker] has deterministic output with its explicit default locale", () => {
	const { body } = renderSSR(DatePickerFixture, { props: { open: false } });
	const expected = new Intl.DateTimeFormat("en-US", {
		day: "numeric",
		month: "long",
		timeZone: "UTC",
		year: "numeric",
	}).format(new Date(Date.UTC(2026, 6, 28)));

	expect(body).toContain('data-slot="date-picker"');
	expect(body).toContain(expected);
});
