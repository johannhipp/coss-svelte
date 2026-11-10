import { afterEach, beforeEach, expect, test, vi } from "vitest";
import type { ToastData } from "../src/toast-manager.js";

let toastManager: typeof import("../src/toast-manager.js").toastManager;
let current: ToastData[] = [];
let unsubscribe: () => void;
beforeEach(async () => {
	vi.resetModules();
	({ toastManager } = await import("../src/toast-manager.js"));
	vi.useFakeTimers();
	unsubscribe = toastManager.subscribe((toasts) => {
		current = toasts;
	});
});
afterEach(() => {
	for (const toast of current) toastManager.close(toast.id);
	unsubscribe();
	vi.clearAllTimers();
	vi.useRealTimers();
});

test("generated IDs preserve existing custom-ID toasts and their lifetimes", () => {
	toastManager.add({ id: "toast-1", title: "Persistent", duration: 0 });
	toastManager.add({ id: "toast-2", title: "Timed", duration: 100 });
	const generatedId = toastManager.add({ title: "Automatic", duration: 200 });

	expect(generatedId).not.toBe("toast-1");
	expect(generatedId).not.toBe("toast-2");
	expect(current.map(({ title }) => title)).toEqual(["Persistent", "Timed", "Automatic"]);
	vi.advanceTimersByTime(100);
	expect(current.map(({ title }) => title)).toEqual(["Persistent", "Automatic"]);
	vi.advanceTimersByTime(100);
	expect(current.map(({ title }) => title)).toEqual(["Persistent"]);
});

test("replacing a timed toast with a persistent toast cancels its timer", () => {
	toastManager.add({ id: "same", title: "Timed", duration: 100 });
	vi.advanceTimersByTime(50);
	toastManager.add({ id: "same", title: "Persistent", duration: 0 });
	vi.advanceTimersByTime(1000);
	expect(current).toEqual([expect.objectContaining({ id: "same", title: "Persistent" })]);
	expect(vi.getTimerCount()).toBe(0);
});

test("replacement duration starts from the update", () => {
	toastManager.add({ id: "same", title: "Initial", duration: 100 });
	vi.advanceTimersByTime(50);
	toastManager.add({ id: "same", title: "Updated", duration: 200 });
	vi.advanceTimersByTime(199);
	expect(current).toHaveLength(1);
	vi.advanceTimersByTime(1);
	expect(current).toEqual([]);
});

test("manual close cancels the timer", () => {
	const id = toastManager.add({ title: "Close me", duration: 100 });
	toastManager.close(id);
	expect(current).toEqual([]);
	expect(vi.getTimerCount()).toBe(0);
	vi.advanceTimersByTime(100);
	expect(current).toEqual([]);
});

test("replacing one toast preserves independent timers and order", () => {
	toastManager.add({ id: "first", title: "First", duration: 100 });
	toastManager.add({ id: "second", title: "Second", duration: 200 });
	toastManager.add({ id: "first", title: "Updated", duration: 0 });
	expect(current.map(({ id }) => id)).toEqual(["second", "first"]);
	vi.advanceTimersByTime(200);
	expect(current.map(({ id }) => id)).toEqual(["first"]);
});
