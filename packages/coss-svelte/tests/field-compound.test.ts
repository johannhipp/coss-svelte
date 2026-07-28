import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";
import FieldCompoundFixture from "./FieldCompoundFixture.svelte";

describe("compound controls inside Field", () => {
	test("places Field IDs and state on the actual convenience controls", () => {
		const { getByRole } = render(FieldCompoundFixture);

		const checkbox = getByRole("checkbox", { name: "Accept terms" });
		expect(checkbox).toHaveAttribute("id", "checkbox-field-control");
		expect(checkbox).toHaveAttribute("aria-invalid", "true");
		expect(checkbox).toHaveAttribute("aria-required", "true");

		const fieldSwitch = getByRole("switch", { name: "Email notifications" });
		expect(fieldSwitch).toHaveAttribute("id", "switch-field-control");
		expect(fieldSwitch).toHaveAttribute("aria-required", "true");

		const select = getByRole("button", { name: "Select framework" });
		expect(select).toHaveAttribute("id", "select-field-control");
		expect(select).toHaveAttribute("aria-required", "true");

		const combobox = getByRole("combobox", { name: "Combobox framework" });
		expect(combobox).toHaveAttribute("id", "combobox-field-control");
		expect(combobox).toHaveAttribute("required");

		const autocomplete = getByRole("combobox", { name: "Autocomplete framework" });
		expect(autocomplete).toHaveAttribute("id", "autocomplete-field-control");
		expect(autocomplete).toBeDisabled();

		const datePicker = getByRole("button", { name: "Start date" });
		expect(datePicker).toHaveAttribute("id", "date-field-control");
		expect(datePicker).toBeDisabled();

		const radioGroup = getByRole("radiogroup", { name: "Field framework" });
		expect(radioGroup).toHaveAttribute("id", "radio-field-control");
		expect(radioGroup).toHaveAttribute("aria-required", "true");
		expect(radioGroup).toHaveAttribute("aria-invalid", "true");
	});

	test("deduplicates caller and Field description IDs", () => {
		const { getByRole } = render(FieldCompoundFixture);

		const checkboxIds = getByRole("checkbox", { name: "Accept terms" })
			.getAttribute("aria-describedby")
			?.split(" ");
		expect(checkboxIds).toEqual([
			"caller-description",
			"checkbox-field-description",
			"checkbox-field-error",
		]);

		const selectIds = getByRole("button", { name: "Select framework" })
			.getAttribute("aria-describedby")
			?.split(" ");
		expect(selectIds).toEqual(["caller-description", "select-field-description"]);
	});

	test("gives convenience and compound RadioGroups real accessible names", () => {
		const { getByRole } = render(FieldCompoundFixture);

		expect(getByRole("radiogroup", { name: "Convenience framework" })).toBeInTheDocument();
		expect(getByRole("radiogroup", { name: "Compound framework" })).toBeInTheDocument();
		expect(getByRole("radiogroup", { name: "Caller ARIA label" })).toBeInTheDocument();
		expect(getByRole("radiogroup", { name: "Custom group name" })).toBeInTheDocument();
	});

	test("keeps explicit control state and IDs authoritative", () => {
		const { getByRole } = render(FieldCompoundFixture);
		const checkbox = getByRole("checkbox", { name: "Explicit checkbox" });

		expect(checkbox).toHaveAttribute("id", "explicit-checkbox");
		expect(checkbox).not.toBeDisabled();
		expect(checkbox).toHaveAttribute("aria-invalid", "false");
		expect(checkbox).not.toHaveAttribute("aria-required", "true");
	});
});
