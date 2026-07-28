import { fireEvent, render } from "@testing-library/svelte";
import { afterEach, describe, expect, test, vi } from "vitest";
import NumberField from "../src/components/NumberField.svelte";
import NumberFieldFixture from "./NumberFieldFixture.svelte";

afterEach(() => {
	vi.useRealTimers();
});

function renderedValue(getByTestId: (id: string) => HTMLElement): string {
	return getByTestId("number-value").textContent ?? "";
}

describe("NumberField composition and accessibility", () => {
	test("renders an accessible fallback composition", () => {
		const { getByRole, getByText } = render(NumberField, {
			props: { defaultValue: 2, min: 0, max: 5 },
		});
		const input = getByRole("spinbutton", { name: "Number" });

		expect(getByText("Number", { selector: "label" })).toHaveAttribute("for", input.id);
		expect(input).toHaveAttribute("aria-valuenow", "2");
		expect(input).toHaveAttribute("aria-valuemin", "0");
		expect(input).toHaveAttribute("aria-valuemax", "5");
		expect(getByRole("button", { name: "Decrease value" })).toHaveAttribute("type", "button");
		expect(getByRole("button", { name: "Increase value" })).toHaveAttribute("type", "button");
	});

	test("uses Field naming, description, required, disabled, and invalid state", () => {
		const { getByRole, getByText } = render(NumberFieldFixture, {
			props: {
				useField: true,
				useRootLabel: false,
				useCustomChildren: false,
				required: true,
				disabled: true,
				invalid: true,
			},
		});
		const input = getByRole("spinbutton", { name: "Field quantity" });
		const description = getByText("Choose a quantity.");

		expect(input).toBeDisabled();
		expect(input).toBeRequired();
		expect(input).toHaveAttribute("aria-invalid", "true");
		expect(input.getAttribute("aria-describedby")).toContain(description.id);
		expect(getByRole("button", { name: "Increase value" })).toBeDisabled();
	});
});

describe("NumberField editing and keyboard behavior", () => {
	test("updates its bound value while editing and aligns on blur", async () => {
		const { getByRole, getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 1, step: 0.5 },
		});
		const input = getByRole("spinbutton", { name: "Quantity" });

		await fireEvent.focus(input);
		await fireEvent.input(input, { target: { value: "2.26" } });
		expect(renderedValue(getByTestId)).toBe("2.26");
		expect(input).toHaveValue("2.26");

		await fireEvent.blur(input);
		expect(renderedValue(getByTestId)).toBe("2.5");
		expect(input).toHaveValue("2.5");
		expect(getByTestId("number-commits")).toHaveTextContent("2.5:input");
	});

	test("preserves partial edits and restores invalid input on commit", async () => {
		const { getByRole, getByTestId } = render(NumberFieldFixture);
		const input = getByRole("spinbutton", { name: "Quantity" });

		await fireEvent.focus(input);
		await fireEvent.input(input, { target: { value: "-" } });
		expect(input).toHaveValue("-");
		expect(renderedValue(getByTestId)).toBe("1");

		await fireEvent.input(input, { target: { value: "nope" } });
		expect(input).toBeInvalid();
		await fireEvent.keyDown(input, { key: "Enter" });
		expect(input).toHaveValue("1");
		expect(input).toHaveAttribute("aria-invalid", "true");
	});

	test("supports arrows, modifiers, pages, and bounds", async () => {
		const { getByRole, getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 5, min: 0, max: 10, step: 1, smallStep: 0.1, largeStep: 5 },
		});
		const input = getByRole("spinbutton", { name: "Quantity" });
		await fireEvent.focus(input);

		await fireEvent.keyDown(input, { key: "ArrowUp" });
		expect(renderedValue(getByTestId)).toBe("6");
		await fireEvent.keyDown(input, { key: "ArrowDown", altKey: true });
		expect(renderedValue(getByTestId)).toBe("5.9");
		await fireEvent.keyDown(input, { key: "ArrowUp", shiftKey: true });
		expect(renderedValue(getByTestId)).toBe("10");
		await fireEvent.keyDown(input, { key: "Home" });
		expect(renderedValue(getByTestId)).toBe("0");
		await fireEvent.keyDown(input, { key: "End" });
		expect(renderedValue(getByTestId)).toBe("10");
		expect(getByRole("button", { name: "Increase value" })).toBeDisabled();
	});

	test("does not mutate disabled or readonly values", async () => {
		for (const props of [{ disabled: true }, { readonly: true }]) {
			const { getByRole, getByTestId, unmount } = render(NumberFieldFixture, {
				props: { initialValue: 4, ...props },
			});
			const input = getByRole("spinbutton", { name: "Quantity" });
			await fireEvent.keyDown(input, { key: "ArrowUp" });
			await fireEvent.click(getByRole("button", { name: "Increase value" }));
			expect(renderedValue(getByTestId)).toBe("4");
			unmount();
		}
	});
});

describe("NumberField pointer and form behavior", () => {
	test("steps once on click and repeats while a pointer is held", async () => {
		vi.useFakeTimers();
		const { getByRole, getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 1 },
		});
		const increment = getByRole("button", { name: "Increase value" });

		await fireEvent.click(increment);
		expect(renderedValue(getByTestId)).toBe("2");

		await fireEvent.pointerDown(increment, {
			button: 0,
			pointerId: 1,
			pointerType: "mouse",
		});
		expect(renderedValue(getByTestId)).toBe("3");
		await vi.advanceTimersByTimeAsync(480);
		expect(renderedValue(getByTestId)).toBe("4");
		await fireEvent.pointerUp(increment, { pointerId: 1, pointerType: "mouse" });
		expect(getByTestId("number-commits")).toHaveTextContent("4:increment");
	});

	test("does not suppress the next click after a pointer press is canceled", async () => {
		vi.useFakeTimers();
		const { getByRole, getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 1 },
		});
		const increment = getByRole("button", { name: "Increase value" });

		await fireEvent.pointerDown(increment, {
			button: 0,
			pointerId: 1,
			pointerType: "mouse",
		});
		await fireEvent.pointerCancel(increment, {
			pointerId: 1,
			pointerType: "mouse",
		});
		await vi.runAllTimersAsync();
		await fireEvent.click(increment);

		expect(renderedValue(getByTestId)).toBe("3");
	});

	test("handles wheel only while focused and explicitly enabled", async () => {
		const { getByRole, getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 2, allowWheelScrub: true },
		});
		const input = getByRole("spinbutton", { name: "Quantity" });

		await fireEvent.wheel(input, { deltaY: -1 });
		expect(renderedValue(getByTestId)).toBe("2");
		await fireEvent.focus(input);
		await fireEvent.wheel(input, { deltaY: -1 });
		expect(renderedValue(getByTestId)).toBe("3");
		expect(getByTestId("number-commits")).toHaveTextContent("3:wheel");
	});

	test("scrubs horizontally in threshold units and commits once", async () => {
		const { getByText, getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 2 },
		});
		const scrubArea = getByText("Quantity", { selector: "label" });

		await fireEvent.pointerDown(scrubArea, {
			button: 0,
			clientX: 10,
			pointerId: 2,
			pointerType: "mouse",
		});
		await fireEvent.pointerMove(scrubArea, {
			clientX: 27,
			pointerId: 2,
			pointerType: "mouse",
		});
		expect(renderedValue(getByTestId)).toBe("4");
		await fireEvent.pointerUp(scrubArea, { pointerId: 2, pointerType: "mouse" });
		expect(getByTestId("number-commits")).toHaveTextContent("4:scrub");
	});

	test("preserves document interaction styles when unmounted without scrubbing", () => {
		const root = document.documentElement;
		const originalUserSelect = root.style.userSelect;
		const originalCursor = root.style.cursor;
		root.style.userSelect = "text";
		root.style.cursor = "crosshair";

		try {
			const { unmount } = render(NumberFieldFixture);
			unmount();

			expect(root.style.userSelect).toBe("text");
			expect(root.style.cursor).toBe("crosshair");
		} finally {
			root.style.userSelect = originalUserSelect;
			root.style.cursor = originalCursor;
		}
	});

	test("serializes one invariant value and restores the default on form reset", async () => {
		const { getByRole, getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 1.5, defaultValue: 1.5, step: 0.5 },
		});
		const form = getByTestId("number-form") as HTMLFormElement;
		const input = getByRole("spinbutton", { name: "Quantity" });
		await fireEvent.focus(input);
		await fireEvent.input(input, { target: { value: "2,000.5" } });
		await fireEvent.blur(input);

		expect(new FormData(form).getAll("quantity")).toEqual(["10"]);
		await fireEvent.click(getByRole("button", { name: "Reset" }));
		expect(renderedValue(getByTestId)).toBe("1.5");
		expect(new FormData(form).getAll("quantity")).toEqual(["1.5"]);
		expect(getByTestId("number-changes")).toHaveTextContent("1.5:reset");
		expect(getByTestId("number-commits")).toHaveTextContent("1.5:reset");
	});
});
