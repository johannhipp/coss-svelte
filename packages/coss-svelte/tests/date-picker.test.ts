import { render, waitFor } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";
import DatePickerFixture from "./DatePickerFixture.svelte";

function expectedDate(locale: string): string {
	return new Intl.DateTimeFormat(locale, {
		day: "numeric",
		month: "long",
		timeZone: "UTC",
		year: "numeric",
	}).format(new Date(Date.UTC(2026, 6, 28)));
}

describe("DatePicker locale contract", () => {
	test.each(["en-US", "de-DE"])("formats its trigger with %s", (locale) => {
		const { getByRole } = render(DatePickerFixture, { locale, open: false });
		expect(getByRole("button", { name: expectedDate(locale) })).toBeInTheDocument();
	});

	test("[runtime:date-picker-locale] updates formatting when locale changes", async () => {
		const { getByRole, rerender } = render(DatePickerFixture, {
			locale: "en-US",
			open: false,
		});
		expect(getByRole("button", { name: expectedDate("en-US") })).toBeInTheDocument();

		await rerender({ locale: "de-DE", open: false });
		expect(getByRole("button", { name: expectedDate("de-DE") })).toBeInTheDocument();
	});

	test("passes the same locale to the calendar and accepts navigation labels", async () => {
		const { container, getByRole } = render(DatePickerFixture, {
			locale: "de-DE",
			previousMonthLabel: "Vorheriger Monat",
			nextMonthLabel: "Nächster Monat",
			open: true,
		});

		await waitFor(() => {
			expect(getByRole("button", { name: "Vorheriger Monat" })).toBeInTheDocument();
			expect(getByRole("button", { name: "Nächster Monat" })).toBeInTheDocument();
		});

		const heading = document.querySelector(".cn-calendar-heading");
		const expectedMonth = new Intl.DateTimeFormat("de-DE", {
			month: "long",
			timeZone: "UTC",
			year: "numeric",
		}).format(new Date(Date.UTC(2026, 6, 1)));
		expect(heading).toHaveTextContent(expectedMonth);
		expect(container.querySelector('[data-slot="date-picker"]')).toHaveTextContent(
			expectedDate("de-DE")
		);
	});
});
