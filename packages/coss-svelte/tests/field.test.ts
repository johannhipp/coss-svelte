import { render } from "@testing-library/svelte";
import { expect, test } from "vitest";
import Input from "../src/components/Input.svelte";
import FieldDynamicFixture from "./FieldDynamicFixture.svelte";
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

test("Field tracks convenience message additions and removals", async () => {
	const { getByRole, rerender } = render(FieldDynamicFixture);
	const input = getByRole("textbox");
	expect(input).not.toHaveAttribute("aria-describedby");
	await rerender({ description: "Help", error: "Invalid" });
	expect(input).toHaveAttribute("aria-describedby", "dynamic-description dynamic-error");
	await rerender({ description: "", error: "" });
	expect(input).not.toHaveAttribute("aria-describedby");
});

test("Field derives invalid state from the current error unless explicitly overridden", async () => {
	const { getByRole, rerender } = render(FieldDynamicFixture);
	const input = getByRole("textbox");
	expect(input).not.toHaveAttribute("aria-invalid", "true");
	await rerender({ error: "Invalid" });
	expect(input).toHaveAttribute("aria-invalid", "true");
	await rerender({ error: "Invalid", invalid: false });
	expect(input).not.toHaveAttribute("aria-invalid", "true");
	await rerender({ error: "", invalid: undefined });
	expect(input).not.toHaveAttribute("aria-invalid", "true");
});

test.each([
	false,
	true,
])("Field tracks explicit compound message IDs, updates, and unmounts (textarea=%s)", async (textarea) => {
	const { getByRole, rerender } = render(FieldDynamicFixture, {
		compound: true,
		textarea,
		describedBy: "caller custom-description custom-description",
	});
	const input = getByRole("textbox");
	expect(input).toHaveAttribute("aria-describedby", "caller custom-description custom-error");
	await rerender({
		descriptionId: "updated-description",
		errorId: "updated-error",
		describedBy: "caller",
	});
	expect(input).toHaveAttribute("aria-describedby", "caller updated-description updated-error");
	await rerender({ showMessages: false });
	expect(input).toHaveAttribute("aria-describedby", "caller");
});
