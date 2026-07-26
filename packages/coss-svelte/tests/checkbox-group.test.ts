import { fireEvent, render } from "@testing-library/svelte";
import { expect, test } from "vitest";
import CheckboxGroupFixture from "./CheckboxGroupFixture.svelte";

test("CheckboxGroup coordinates the selected values of its child checkboxes", async () => {
	const { getByRole } = render(CheckboxGroupFixture);
	const next = getByRole("checkbox", { name: "Next.js" });
	const vite = getByRole("checkbox", { name: "Vite" });
	const value = getByRole("status");

	expect(next).toHaveAttribute("aria-checked", "true");
	expect(vite).toHaveAttribute("aria-checked", "false");
	expect(value).toHaveTextContent("next");

	await fireEvent.click(vite);

	expect(vite).toHaveAttribute("aria-checked", "true");
	expect(value).toHaveTextContent("next,vite");
});
