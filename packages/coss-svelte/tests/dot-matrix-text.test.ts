import { render } from "@testing-library/svelte";
import { expect, test } from "vitest";
import DotMatrixText from "../src/components/DotMatrixText.svelte";

test("updates its accessible name when text changes and supports decorative marks", async () => {
	const view = render(DotMatrixText, { text: "BOARD", motion: "still" });
	expect(view.getByRole("img", { name: "BOARD" })).toBeTruthy();
	await view.rerender({ text: "HELLO" });
	expect(view.getByRole("img", { name: "HELLO" })).toBeTruthy();
	await view.rerender({ text: "HELLO", label: "" });
	expect(view.queryByRole("img")).toBeNull();
	view.unmount();
});

test("lays out multiple lines and renders unknown characters visibly", () => {
	const view = render(DotMatrixText, { text: "A\n☃", motion: "still" });
	const image = view.getByRole("img", { name: /A\s+☃/ });
	expect(image.style.getPropertyValue("--dm-cols")).toBe("5");
	expect(image.querySelectorAll(".cn-dot-matrix-dot").length).toBe(18 + 20);
	view.unmount();
});
