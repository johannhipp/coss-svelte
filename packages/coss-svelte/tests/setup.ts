import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/svelte";
import { afterEach } from "vitest";

if (!window.CSS) {
	Object.defineProperty(window, "CSS", { configurable: true, value: {} });
}
if (typeof window.CSS.supports !== "function") {
	Object.defineProperty(window.CSS, "supports", {
		configurable: true,
		value: () => false,
	});
}
if (typeof globalThis.ResizeObserver !== "function") {
	class TestResizeObserver implements ResizeObserver {
		disconnect() {}
		observe() {}
		unobserve() {}
	}
	Object.defineProperty(globalThis, "ResizeObserver", {
		configurable: true,
		value: TestResizeObserver,
	});
}

afterEach(() => cleanup());
