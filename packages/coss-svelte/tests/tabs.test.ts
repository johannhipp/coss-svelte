import { fireEvent, render } from "@testing-library/svelte";
import { expect, test, vi } from "vitest";
import Tabs from "../src/components/Tabs.svelte";
import TabsCompoundFixture from "./TabsCompoundFixture.svelte";

test("Tabs renders object content for every convenience panel", async () => {
	const { getByRole } = render(Tabs, {
		value: "first",
		tabs: [
			{ value: "first", label: "First", content: "First panel" },
			{ value: "second", label: "Second", content: "Second panel" },
		],
	});
	expect(getByRole("tabpanel")).toHaveTextContent("First panel");
	await fireEvent.click(getByRole("tab", { name: "Second" }));
	expect(getByRole("tabpanel")).toHaveTextContent("Second panel");
	await fireEvent.click(getByRole("tab", { name: "First" }));
	expect(getByRole("tabpanel")).toHaveTextContent("First panel");
});

test("Tabs preserves compound panel content", async () => {
	const { getByRole } = render(TabsCompoundFixture);
	expect(getByRole("tabpanel")).toHaveTextContent("Compound first");
	await fireEvent.click(getByRole("tab", { name: "Second" }));
	expect(getByRole("tabpanel")).toHaveTextContent("Compound second");
});

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
	expect(indicator).not.toHaveAttribute("data-ready");

	readyFrames[1]?.(0);
	await Promise.resolve();
	expect(indicator).toHaveAttribute("data-ready");

	await fireEvent.click(details);

	expect(details).toHaveAttribute("data-state", "active");
	expect(overview).toHaveAttribute("data-state", "inactive");
});
