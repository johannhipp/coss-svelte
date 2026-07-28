import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";
import CompositionContractsFixture from "./CompositionContractsFixture.svelte";

const customMarkers = [
	"accordion-child",
	"avatar-child",
	"autocomplete-child",
	"combobox-child",
	"command-child",
	"date-picker-child",
	"dialog-child",
	"alert-dialog-child",
	"sheet-child",
	"drawer-child",
	"menu-child",
	"number-field-child",
	"popover-child",
	"preview-card-child",
	"radio-group-child",
	"select-child",
	"tabs-child",
	"toggle-group-child",
	"tooltip-child",
] as const;

const fallbackText = [
	"fallback-accordion",
	"fallback-avatar",
	"fallback-option",
	"fallback-command",
	"fallback-command-input",
	"fallback-date-picker",
	"fallback-dialog-trigger",
	"fallback-dialog-title",
	"fallback-alert-trigger",
	"fallback-alert-title",
	"fallback-sheet-trigger",
	"fallback-sheet-title",
	"fallback-drawer-trigger",
	"fallback-drawer-title",
	"fallback-menu-item",
	"fallback-menu-trigger",
	"fallback-number-field",
	"fallback-popover",
	"fallback-preview-card",
	"fallback-preview-title",
	"fallback-select",
	"fallback-tab",
	"fallback-toggle",
	"fallback-tooltip-trigger",
	"fallback-tooltip",
] as const;

describe("root composition contracts", () => {
	test("children replace every convenience hierarchy in children-first families", () => {
		const { getByTestId, queryByText } = render(CompositionContractsFixture);

		for (const marker of customMarkers) {
			expect(getByTestId(marker)).toBeInTheDocument();
		}
		for (const fallback of fallbackText) {
			expect(queryByText(fallback)).not.toBeInTheDocument();
		}
	});

	test("content and additive exceptions retain both sides of their contract", () => {
		const { getByRole, getByTestId, getByText } = render(CompositionContractsFixture);

		expect(getByRole("button", { name: "collapsible trigger" })).toBeInTheDocument();
		expect(getByTestId("collapsible-child")).toBeInTheDocument();
		expect(getByText("sidebar fallback item")).toBeInTheDocument();
		expect(getByTestId("sidebar-child")).toBeInTheDocument();
	});

	test("payload snippets receive concrete Calendar and Pagination state", () => {
		const { getByTestId } = render(CompositionContractsFixture);
		const calendar = getByTestId("calendar-payload");
		const pagination = getByTestId("pagination-payload");

		expect(Number(calendar.dataset.monthCount)).toBeGreaterThan(0);
		expect(Number(calendar.dataset.weekdayCount)).toBe(7);
		expect(Number(pagination.dataset.pageCount)).toBeGreaterThan(0);
		expect(pagination).toHaveAttribute("data-range-start", "11");
		expect(pagination).toHaveAttribute("data-current-page", "2");
	});
});
