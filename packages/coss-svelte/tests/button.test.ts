import { fireEvent, render } from "@testing-library/svelte";
import { expect, test } from "vitest";
import ButtonFixture from "./ButtonFixture.svelte";

test("Button uses the href discriminant and blocks both loading branches", async () => {
	const { getByTestId } = render(ButtonFixture);
	const anchor = getByTestId("loading-anchor");
	const button = getByTestId("loading-button");

	expect(anchor.tagName).toBe("A");
	expect(anchor).toHaveAttribute("href", "");
	expect(anchor).toHaveAttribute("aria-disabled", "true");
	expect(anchor).not.toHaveAttribute("disabled");
	expect(button.tagName).toBe("BUTTON");
	expect(button).toBeDisabled();

	await fireEvent.click(anchor);
	await fireEvent.click(button);

	expect(getByTestId("anchor-clicks")).toHaveTextContent("0");
	expect(getByTestId("button-clicks")).toHaveTextContent("0");
});
