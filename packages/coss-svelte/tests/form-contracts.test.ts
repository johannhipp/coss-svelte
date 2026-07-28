import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";
import FormContractsFixture from "./FormContractsFixture.svelte";

function entries(form: HTMLFormElement): Array<[string, string]> {
	return [...new FormData(form).entries()].map(([name, value]) => [name, String(value)]);
}

describe("public form contracts", () => {
	test("[runtime:form-controls-form] serializes native and PinInput-backed text values and omits disabled controls", () => {
		const { getByTestId } = render(FormContractsFixture);
		const values = entries(getByTestId("form") as HTMLFormElement);

		expect(values).toContainEqual(["native-input", "alpha"]);
		expect(values).toContainEqual(["native-empty", ""]);
		expect(values).toContainEqual(["native-textarea", "notes"]);
		expect(values).toContainEqual(["otp", "4821"]);
		expect(values).not.toContainEqual(["native-disabled", "omitted"]);
		expect(values).not.toContainEqual(["textarea-disabled", "omitted"]);
		expect(values).not.toContainEqual(["otp-disabled", "9999"]);
	});

	test("serializes Switch and Checkbox checked state", () => {
		const { getByTestId } = render(FormContractsFixture);
		const values = entries(getByTestId("form") as HTMLFormElement);

		expect(values).toContainEqual(["switch-checked", "enabled"]);
		expect(values.some(([name]) => name === "switch-unchecked")).toBe(false);
		expect(values.some(([name]) => name === "switch-disabled")).toBe(false);
		expect(values).toContainEqual(["checkbox-default", "on"]);
		expect(values).toContainEqual(["checkbox-custom", "custom"]);
		expect(values.some(([name]) => name === "checkbox-unchecked")).toBe(false);
		expect(values.some(([name]) => name === "checkbox-disabled")).toBe(false);
	});

	test("[runtime:choice-form] serializes CheckboxGroup and RadioGroup selections", () => {
		const { getByTestId } = render(FormContractsFixture);
		const values = entries(getByTestId("form") as HTMLFormElement);

		expect(values.filter(([name]) => name === "checkbox-group")).toEqual([
			["checkbox-group", "svelte"],
			["checkbox-group", "react"],
		]);
		expect(values.some(([name]) => name === "checkbox-group-disabled")).toBe(false);
		expect(values).toContainEqual(["radio", "react"]);
		expect(values.some(([name]) => name === "radio-disabled")).toBe(false);
	});

	test("[runtime:listbox-form] serializes single Select, Combobox, and Autocomplete values", () => {
		const { getByTestId } = render(FormContractsFixture);
		const values = entries(getByTestId("form") as HTMLFormElement);

		expect(values).toContainEqual(["select", "svelte"]);
		expect(values).toContainEqual(["select-empty", ""]);
		expect(values.some(([name]) => name === "select-disabled")).toBe(false);
		expect(values).toContainEqual(["combobox", "react"]);
		expect(values.some(([name]) => name === "combobox-disabled")).toBe(false);
		expect(values).toContainEqual(["autocomplete", "svelte"]);
		expect(values.some(([name]) => name === "autocomplete-disabled")).toBe(false);
	});

	test("exposes required validity through the observable form", () => {
		const { getByRole, getByTestId } = render(FormContractsFixture);
		const form = getByTestId("form") as HTMLFormElement;

		expect(getByRole("switch", { name: "Required switch" })).toHaveAttribute(
			"aria-required",
			"true"
		);
		expect(getByRole("radiogroup", { name: "Required radio framework" })).toHaveAttribute(
			"aria-required",
			"true"
		);
		expect(getByRole("button", { name: "Required select" })).toHaveAttribute(
			"aria-required",
			"true"
		);
		expect(form.checkValidity()).toBe(false);
	});
});
