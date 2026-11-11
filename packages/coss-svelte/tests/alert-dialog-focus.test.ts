import { cleanup, fireEvent, render } from "@testing-library/svelte";
import { afterEach, expect, test, vi } from "vitest";
import AlertDialogFocusFixture from "./AlertDialogFocusFixture.svelte";

afterEach(async () => {
	try {
		cleanup();
		if (vi.isFakeTimers()) await vi.runAllTimersAsync();
	} finally {
		vi.useRealTimers();
	}
});

test("a quick close keeps focus on the trigger after pending timers run", async () => {
	vi.useFakeTimers();
	const { getByRole } = render(AlertDialogFocusFixture);
	const trigger = getByRole("button", { name: "Open alert" });
	trigger.focus();
	await fireEvent.click(trigger);
	const popup = getByRole("alertdialog", { name: "Alert" });
	expect(popup).toHaveFocus();
	await fireEvent.keyDown(document, { key: "Escape" });
	expect(trigger).toHaveFocus();
	await vi.runAllTimersAsync();
	expect(trigger).toHaveFocus();
});

test("opening autofocus respects consumer cancellation", async () => {
	vi.useFakeTimers();
	const { getByRole } = render(AlertDialogFocusFixture, { props: { cancelAutofocus: true } });
	const trigger = getByRole("button", { name: "Open alert" });
	trigger.focus();
	await fireEvent.click(trigger);
	await vi.runAllTimersAsync();
	expect(trigger).toHaveFocus();
});

test("the convenience alert dialog focuses on open and restores focus on close", async () => {
	vi.useFakeTimers();
	const { getByRole } = render(AlertDialogFocusFixture, { props: { convenience: true } });
	const trigger = getByRole("button", { name: "Open alert" });
	trigger.focus();
	await fireEvent.click(trigger);
	expect(getByRole("alertdialog", { name: "Alert" })).toHaveFocus();
	await fireEvent.keyDown(document, { key: "Escape" });
	await vi.runAllTimersAsync();
	expect(trigger).toHaveFocus();
});
