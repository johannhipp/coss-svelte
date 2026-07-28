import { fireEvent, render, waitFor } from "@testing-library/svelte";
import { afterEach, expect, test, vi } from "vitest";
import OTPField from "../src/components/OTPField.svelte";

const PIN_INPUT_SYNC_SETTLE_MS = 50;

afterEach(() => {
	vi.useRealTimers();
});

test("OTPField completes once with the exact maxlength string", async () => {
	vi.useFakeTimers();
	const onComplete = vi.fn<(value: string) => void>();
	const { getByLabelText, unmount } = render(OTPField, {
		length: 4,
		"aria-label": "Verification code",
		onComplete,
	});
	const input = getByLabelText("Verification code");

	await fireEvent.input(input, { target: { value: "4821" } });
	await waitFor(() => expect(onComplete).toHaveBeenCalledOnce());
	await vi.advanceTimersByTimeAsync(PIN_INPUT_SYNC_SETTLE_MS);
	expect(onComplete).toHaveBeenCalledWith("4821");

	await fireEvent.input(input, { target: { value: "48219" } });
	await vi.advanceTimersByTimeAsync(PIN_INPUT_SYNC_SETTLE_MS);
	expect(onComplete).toHaveBeenCalledOnce();
	unmount();
});
