import { fireEvent, render } from "@testing-library/svelte";
import { expect, test, vi } from "vitest";
import Tabs from "../src/components/Tabs.svelte";

test("Tabs renders one shared indicator that follows the active trigger", async () => {
	const readyFrames: FrameRequestCallback[] = [];
	vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
		readyFrames.push(callback);
		return readyFrames.length;
	});

	const { container, getByRole } = render(Tabs);
	const overview = getByRole("tab", { name: "Overview" });
	const details = getByRole("tab", { name: "Details" });
	const indicator = container.querySelector('[data-slot="tabs-indicator"]');

	expect(container.querySelectorAll('[data-slot="tabs-indicator"]')).toHaveLength(1);
	expect(overview).toHaveAttribute("data-state", "active");
	expect(indicator).not.toHaveAttribute("data-ready");

	readyFrames[0]?.(0);
	await Promise.resolve();
	expect(indicator).toHaveAttribute("data-ready");

	await fireEvent.click(details);

	expect(details).toHaveAttribute("data-state", "active");
	expect(overview).toHaveAttribute("data-state", "inactive");
});
