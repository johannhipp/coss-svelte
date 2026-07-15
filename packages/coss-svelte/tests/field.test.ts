import { render } from "@testing-library/svelte";
import { expect, test } from "vitest";
import Input from "../src/components/Input.svelte";
import FieldFixture from "./FieldFixture.svelte";

test("Field associates its label, control, and descriptions", () => {
	const { getByLabelText, getByText } = render(FieldFixture);
	const input = getByLabelText("Email");
	const description = getByText("Use your work email.", { selector: "p" });
	const error = getByText("Email is invalid", { selector: "p" });

	expect(input).toHaveAttribute("id");
	expect(input).toHaveAttribute("required");
	expect(input).toHaveAttribute("aria-invalid", "true");
	expect(input.getAttribute("aria-describedby")).toContain(description.id);
	expect(input.getAttribute("aria-describedby")).toContain(error.id);
	expect(description.id).not.toBe(error.id);
});

test("Input outside Field remains a plain native control", () => {
	const { container } = render(Input);
	const input = container.querySelector("input");
	expect(input).not.toHaveAttribute("aria-invalid");
	expect(input).not.toHaveAttribute("aria-describedby");
});
