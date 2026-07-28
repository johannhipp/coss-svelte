import { fireEvent, render } from "@testing-library/svelte";
import { afterEach, describe, expect, test, vi } from "vitest";
import NumberField from "../src/components/NumberField.svelte";
import NumberFieldGroup from "../src/components/NumberFieldGroup.svelte";
import NumberFieldInput from "../src/components/NumberFieldInput.svelte";
import NumberFieldExternalFormFixture from "./NumberFieldExternalFormFixture.svelte";
import NumberFieldFieldPartsFixture from "./NumberFieldFieldPartsFixture.svelte";
import NumberFieldFixture from "./NumberFieldFixture.svelte";
import NumberFieldInvalidScrubFixture from "./NumberFieldInvalidScrubFixture.svelte";

afterEach(() => {
	vi.useRealTimers();
});

function renderedValue(getByTestId: (id: string) => HTMLElement): string {
	return getByTestId("number-value").textContent ?? "";
}

describe("NumberField composition and accessibility", () => {
	test("renders an accessible fallback composition", () => {
		const { container, getByRole, getByText } = render(NumberField, {
			props: { defaultValue: 2, min: 0, max: 5 },
		});
		const input = getByRole("spinbutton", { name: "Number" });

		expect(getByText("Number", { selector: "label" })).toHaveAttribute("for", input.id);
		expect(input).toHaveAttribute("aria-valuenow", "2");
		expect(input).toHaveAttribute("aria-valuemin", "0");
		expect(input).toHaveAttribute("aria-valuemax", "5");
		expect(getByRole("button", { name: "Decrease value" })).toHaveAttribute("type", "button");
		expect(getByRole("button", { name: "Increase value" })).toHaveAttribute("type", "button");
		expect(container.querySelectorAll('[data-slot="number-field-input"]')).toHaveLength(1);
	});

	test("uses Field naming and merged description/state without duplicating a label", () => {
		const { getAllByText, getByRole, getByText, queryByText } = render(NumberFieldFixture, {
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
		expect(input).toHaveAttribute("aria-disabled", "true");
		expect(input).toHaveAttribute("aria-required", "true");
		expect(input).toHaveAttribute("aria-invalid", "true");
		expect(input.getAttribute("aria-describedby")).toContain(description.id);
		expect(getAllByText("Field quantity", { selector: "label" })).toHaveLength(1);
		expect(queryByText("Number", { selector: "label" })).not.toBeInTheDocument();
		expect(getByRole("button", { name: "Increase value" })).toBeDisabled();
	});

	test("keeps custom scrub visuals hidden from the accessible label", () => {
		const { getByRole, getByText } = render(NumberFieldFixture, {
			props: { customScrubContent: true },
		});
		const visual = getByText("Drag quantity");

		expect(visual.parentElement).toHaveAttribute("aria-hidden", "true");
		expect(getByRole("spinbutton", { name: "Quantity" })).toBeInTheDocument();
	});

	test("preserves explicit input naming and merges caller and Field descriptions", () => {
		const { getByRole, getByText } = render(NumberFieldFixture, {
			props: {
				useField: true,
				inputAriaLabel: "Exact quantity",
				inputDescribedBy: "consumer-description",
			},
		});
		const input = getByRole("spinbutton", { name: "Exact quantity" });

		expect(input.getAttribute("aria-describedby")).toContain("consumer-description");
		expect(input.getAttribute("aria-describedby")).toContain(getByText("Choose a quantity.").id);
	});

	test("recognizes a compound FieldLabel and omits the convenience scrub label", () => {
		const { getByRole, getByText, queryByText } = render(NumberFieldFieldPartsFixture);
		const input = getByRole("spinbutton", { name: "Compound quantity" });

		expect(input.getAttribute("aria-describedby")).toContain(
			getByText("Choose a compound quantity.").id
		);
		expect(queryByText("Number", { selector: "label" })).not.toBeInTheDocument();
	});

	test("fails descriptively for invalid roots, scrub labels, and orphaned parts", () => {
		expect(() => render(NumberField, { props: { value: Number.NaN } })).toThrow(
			/finite number or null/
		);
		expect(() =>
			render(NumberField, {
				props: { format: { style: "currency" } },
			})
		).toThrow(/locale or format is invalid/);
		expect(() => render(NumberFieldGroup)).toThrow(/inside <NumberField>/);
		expect(() => render(NumberFieldInput)).toThrow(/inside <NumberField>/);
		expect(() => render(NumberFieldInvalidScrubFixture)).toThrow(/non-empty label/);
	});
});

describe("NumberField editing and keyboard behavior", () => {
	test("preserves typed precision without snapping to the step grid", async () => {
		const { getByRole, getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 1, step: 0.5 },
		});
		const input = getByRole("spinbutton", { name: "Quantity" });

		await fireEvent.focus(input);
		await fireEvent.input(input, { target: { value: "2.26" } });
		expect(renderedValue(getByTestId)).toBe("2.26");
		expect(input).toHaveValue("2.26");
		expect(getByTestId("number-changes")).toHaveTextContent("2.26:input:1:input");

		await fireEvent.blur(input);
		expect(renderedValue(getByTestId)).toBe("2.26");
		expect(input).toHaveValue("2.3");
		expect(getByTestId("number-commits")).toHaveTextContent("2.26:input:1:blur");
	});

	test("preserves partial edits, reports validity, and lets Escape discard only the buffer", async () => {
		const { getByRole, getByTestId } = render(NumberFieldFixture);
		const input = getByRole("spinbutton", { name: "Quantity" });

		await fireEvent.focus(input);
		await fireEvent.input(input, { target: { value: "-" } });
		expect(input).toHaveValue("-");
		expect(input).toBeInvalid();
		expect(renderedValue(getByTestId)).toBe("1");

		expect(await fireEvent.keyDown(input, { key: "Escape" })).toBe(false);
		expect(input).toHaveValue("1");
		expect(input).toBeValid();
		expect(await fireEvent.keyDown(input, { key: "Escape" })).toBe(true);
		expect(getByTestId("number-commits")).toHaveTextContent(/^$/);
	});

	test("clamps out-of-range values only at a user commit boundary", async () => {
		const { getByRole, getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 12, min: 0, max: 10 },
		});
		const input = getByRole("spinbutton", { name: "Quantity" });

		expect(renderedValue(getByTestId)).toBe("12");
		expect(input).toBeInvalid();
		expect(input).toHaveAttribute("aria-valuenow", "12");
		await fireEvent.focus(input);
		await fireEvent.blur(input);
		expect(renderedValue(getByTestId)).toBe("10");
		expect(getByTestId("number-changes")).toHaveTextContent("10:input:12:blur");
		expect(getByTestId("number-commits")).toHaveTextContent("10:input:12:blur");
	});

	test("supports all step keys and gives Shift precedence over Alt", async () => {
		const { getByRole, getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 5, min: 0, max: 10, step: 1, smallStep: 0.1, largeStep: 5 },
		});
		const input = getByRole("spinbutton", { name: "Quantity" });
		await fireEvent.focus(input);

		await fireEvent.keyDown(input, { key: "ArrowUp" });
		expect(renderedValue(getByTestId)).toBe("6");
		await fireEvent.keyDown(input, { key: "ArrowDown", altKey: true });
		expect(renderedValue(getByTestId)).toBe("5.9");
		await fireEvent.keyDown(input, { key: "ArrowUp", altKey: true, shiftKey: true });
		expect(renderedValue(getByTestId)).toBe("10");
		await fireEvent.keyDown(input, { key: "PageDown" });
		expect(renderedValue(getByTestId)).toBe("5");
		await fireEvent.keyDown(input, { key: "Home" });
		expect(renderedValue(getByTestId)).toBe("0");
		await fireEvent.keyDown(input, { key: "End" });
		expect(renderedValue(getByTestId)).toBe("10");
		expect(getByRole("button", { name: "Increase value" })).toBeDisabled();
	});

	test("composes consumer key handlers before owned behavior", async () => {
		const { getByRole, getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 4, cancelArrowKeys: true },
		});
		const input = getByRole("spinbutton", { name: "Quantity" });
		await fireEvent.focus(input);
		await fireEvent.keyDown(input, { key: "ArrowUp" });

		expect(renderedValue(getByTestId)).toBe("4");
		expect(getByTestId("number-changes")).toHaveTextContent(/^$/);
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
			expect(input).toHaveAttribute(props.readonly ? "aria-readonly" : "aria-disabled", "true");
			unmount();
		}
	});

	test("keeps external binding writes silent and updates display", async () => {
		const { getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 1 },
		});
		await fireEvent.click(getByTestId("external-write"));

		expect(renderedValue(getByTestId)).toBe("7.25");
		expect(getByTestId("number-changes")).toHaveTextContent(/^$/);
		expect(getByTestId("number-commits")).toHaveTextContent(/^$/);
	});

	test("[runtime:number-field-locale] updates locale and format without changing the canonical value", async () => {
		const localeCase = render(NumberFieldFixture, {
			props: { initialValue: 1, locale: "de-DE" },
		});
		const localeInput = localeCase.getByRole("spinbutton", { name: "Quantity" });
		await fireEvent.focus(localeInput);
		await fireEvent.input(localeInput, { target: { value: "2," } });
		await fireEvent.click(localeCase.getByTestId("locale-write"));
		expect(localeInput).toHaveValue("2");
		expect(renderedValue(localeCase.getByTestId)).toBe("2");
		localeCase.unmount();

		const formatCase = render(NumberFieldFixture, {
			props: { initialValue: 0.12 },
		});
		const formatInput = formatCase.getByRole("spinbutton", { name: "Quantity" });
		await fireEvent.click(formatCase.getByTestId("format-write"));
		expect(formatInput).toHaveValue("12%");
		expect(renderedValue(formatCase.getByTestId)).toBe("0.12");
		expect(formatCase.getByTestId("number-changes")).toHaveTextContent(/^$/);
	});

	test("normalizes on Enter without canceling native form behavior", async () => {
		const { getByRole, getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 1 },
		});
		const input = getByRole("spinbutton", { name: "Quantity" });
		await fireEvent.focus(input);
		await fireEvent.input(input, { target: { value: "4" } });

		expect(await fireEvent.keyDown(input, { key: "Enter" })).toBe(true);
		await fireEvent.submit(getByTestId("number-form"));
		expect(getByTestId("number-submissions")).toHaveTextContent("1");
		expect(getByTestId("number-commits")).toHaveTextContent("4:input:1:keydown");
	});
});

describe("NumberField pointer behavior", () => {
	test("steps once on click and repeats while a primary pointer is held", async () => {
		vi.useFakeTimers();
		const { getByRole, getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 1 },
		});
		const increment = getByRole("button", { name: "Increase value" });

		await fireEvent.click(increment);
		expect(renderedValue(getByTestId)).toBe("2");

		await fireEvent.pointerDown(increment, {
			button: 0,
			isPrimary: true,
			pointerId: 1,
			pointerType: "mouse",
		});
		expect(renderedValue(getByTestId)).toBe("3");
		await vi.advanceTimersByTimeAsync(480);
		expect(renderedValue(getByTestId)).toBe("4");
		await fireEvent.pointerUp(increment, {
			isPrimary: true,
			pointerId: 1,
			pointerType: "mouse",
		});
		await vi.advanceTimersByTimeAsync(500);
		expect(renderedValue(getByTestId)).toBe("4");
		expect(getByTestId("number-commits")).toHaveTextContent("4:increment:2:pointerup");
		expect(getByTestId("number-changes")).toHaveTextContent("4:increment:3:pointerdown");
	});

	test("commits cancellation once, clears timers, and does not suppress a later click", async () => {
		vi.useFakeTimers();
		const { getByRole, getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 1 },
		});
		const increment = getByRole("button", { name: "Increase value" });

		await fireEvent.pointerDown(increment, {
			button: 0,
			isPrimary: true,
			pointerId: 1,
			pointerType: "mouse",
		});
		await fireEvent.pointerCancel(increment, {
			isPrimary: true,
			pointerId: 1,
			pointerType: "mouse",
		});
		await vi.runAllTimersAsync();
		expect(getByTestId("number-commits")).toHaveTextContent("2:increment:1:pointercancel");

		await fireEvent.click(increment);
		expect(renderedValue(getByTestId)).toBe("3");
	});

	test("uses the same terminal cleanup for window blur and unmount", async () => {
		vi.useFakeTimers();
		const windowCase = render(NumberFieldFixture, {
			props: { initialValue: 1 },
		});
		const increment = windowCase.getByRole("button", { name: "Increase value" });
		await fireEvent.pointerDown(increment, {
			button: 0,
			isPrimary: true,
			pointerId: 8,
			pointerType: "mouse",
		});
		window.dispatchEvent(new Event("blur"));
		await vi.advanceTimersByTimeAsync(800);
		expect(renderedValue(windowCase.getByTestId)).toBe("2");
		expect(windowCase.getByTestId("number-commits")).toHaveTextContent("2:increment:1:blur");
		windowCase.unmount();

		const onValueCommit = vi.fn();
		const unmountCase = render(NumberField, {
			props: { defaultValue: 1, onValueCommit },
		});
		await fireEvent.pointerDown(unmountCase.getByRole("button", { name: "Increase value" }), {
			button: 0,
			isPrimary: true,
			pointerId: 9,
			pointerType: "mouse",
		});
		unmountCase.unmount();
		expect(onValueCommit).toHaveBeenCalledOnce();
		expect(onValueCommit.mock.calls[0]?.[1]).toMatchObject({
			reason: "increment",
			previousValue: 1,
			sourceEvent: null,
		});
	});

	test("handles wheel only while focused and explicitly enabled", async () => {
		const { getByRole, getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 2, allowWheelScrub: true },
		});
		const input = getByRole("spinbutton", { name: "Quantity" });

		expect(await fireEvent.wheel(input, { deltaY: -1 })).toBe(true);
		expect(renderedValue(getByTestId)).toBe("2");
		await fireEvent.focus(input);
		expect(await fireEvent.wheel(input, { deltaY: -1 })).toBe(false);
		expect(renderedValue(getByTestId)).toBe("3");
		expect(getByTestId("number-commits")).toHaveTextContent("3:wheel:2:wheel");
	});

	test("scrubs by threshold, retains direction remainder, and commits on release", async () => {
		const { getByText, getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 2 },
		});
		const scrubArea = getByText("Quantity", { selector: "label" }).parentElement as HTMLDivElement;

		await fireEvent.pointerDown(scrubArea, {
			button: 0,
			clientX: 10,
			isPrimary: true,
			pointerId: 2,
			pointerType: "mouse",
		});
		expect(document.activeElement).toBe(
			getByTestId("number-form").querySelector('[role="spinbutton"]')
		);
		await fireEvent.pointerMove(scrubArea, {
			clientX: 27,
			isPrimary: true,
			pointerId: 2,
			pointerType: "mouse",
		});
		expect(renderedValue(getByTestId)).toBe("4");
		await fireEvent.pointerMove(scrubArea, {
			clientX: 18,
			isPrimary: true,
			pointerId: 2,
			pointerType: "mouse",
		});
		expect(renderedValue(getByTestId)).toBe("3");
		await fireEvent.pointerUp(scrubArea, {
			isPrimary: true,
			pointerId: 2,
			pointerType: "mouse",
		});
		expect(getByTestId("number-commits")).toHaveTextContent("3:scrub:2:pointerup");
	});

	test("does not hijack touch scrubbing or mutate document interaction styles", async () => {
		const root = document.documentElement;
		const originalUserSelect = root.style.userSelect;
		const originalCursor = root.style.cursor;
		root.style.userSelect = "text";
		root.style.cursor = "crosshair";

		try {
			const { getByText, getByTestId, unmount } = render(NumberFieldFixture);
			const scrubArea = getByText("Quantity", { selector: "label" })
				.parentElement as HTMLDivElement;
			await fireEvent.pointerDown(scrubArea, {
				button: 0,
				clientX: 0,
				isPrimary: true,
				pointerId: 3,
				pointerType: "touch",
			});
			await fireEvent.pointerMove(scrubArea, {
				clientX: 40,
				isPrimary: true,
				pointerId: 3,
				pointerType: "touch",
			});
			expect(renderedValue(getByTestId)).toBe("1");
			unmount();
			expect(root.style.userSelect).toBe("text");
			expect(root.style.cursor).toBe("crosshair");
		} finally {
			root.style.userSelect = originalUserSelect;
			root.style.cursor = originalCursor;
		}
	});
});

describe("NumberField native form behavior", () => {
	test("[runtime:number-field-form] serializes one invariant value and resets to the captured initial default", async () => {
		const { getByRole, getByTestId } = render(NumberFieldFixture, {
			props: { initialValue: 1.5, defaultValue: 1.5, step: 0.5 },
		});
		const form = getByTestId("number-form") as HTMLFormElement;
		const input = getByRole("spinbutton", { name: "Quantity" });
		await fireEvent.click(getByTestId("default-write"));
		await fireEvent.focus(input);
		await fireEvent.input(input, { target: { value: "2,000.5" } });
		await fireEvent.blur(input);

		expect(new FormData(form).getAll("quantity")).toEqual(["10"]);
		await fireEvent.click(getByRole("button", { name: "Reset" }));
		expect(renderedValue(getByTestId)).toBe("1.5");
		expect(new FormData(form).getAll("quantity")).toEqual(["1.5"]);
		expect(getByTestId("number-changes")).toHaveTextContent("1.5:reset:10:reset");
		expect(getByTestId("number-commits")).toHaveTextContent("1.5:reset:10:reset");
	});

	test("serializes null as one empty entry and omits disabled fields", () => {
		const nullCase = render(NumberFieldFixture, {
			props: { initialValue: null, required: true },
		});
		const nullForm = nullCase.getByTestId("number-form") as HTMLFormElement;
		const nullInput = nullCase.getByRole("spinbutton", { name: "Quantity" });
		expect(new FormData(nullForm).getAll("quantity")).toEqual([""]);
		expect(nullInput).toBeInvalid();
		nullCase.unmount();

		const disabledCase = render(NumberFieldFixture, {
			props: { initialValue: 2, disabled: true },
		});
		const disabledForm = disabledCase.getByTestId("number-form") as HTMLFormElement;
		expect(new FormData(disabledForm).getAll("quantity")).toEqual([]);
	});

	test("associates both visible and hidden controls with an external form", async () => {
		const { getByRole, getByTestId } = render(NumberFieldExternalFormFixture);
		const form = getByTestId("external-number-form") as HTMLFormElement;
		const input = getByRole("spinbutton", { name: "External quantity" }) as HTMLInputElement;

		expect(input.form).toBe(form);
		expect(new FormData(form).getAll("quantity")).toEqual(["1.5"]);
		await fireEvent.click(getByRole("button", { name: "Increase value" }));
		expect(new FormData(form).getAll("quantity")).toEqual(["2"]);
		await fireEvent.click(getByRole("button", { name: "Reset external" }));
		expect(getByTestId("external-number-value")).toHaveTextContent("1.5");
	});

	test("does not render a serialization control without a name", () => {
		const { container } = render(NumberField, {
			props: { defaultValue: 2, label: "Unnamed" },
		});
		expect(container.querySelector('input[type="hidden"]')).not.toBeInTheDocument();
	});
});
