import { fireEvent, render } from "@testing-library/svelte";
import { expect, test } from "vitest";
import Tabs from "../src/components/Tabs.svelte";

test("Tabs renders one shared indicator that follows the active trigger", async () => {
	const { container, getByRole } = render(Tabs);
	const overview = getByRole("tab", { name: "Overview" });
	const details = getByRole("tab", { name: "Details" });

	expect(container.querySelectorAll('[data-slot="tabs-indicator"]')).toHaveLength(1);
	expect(overview).toHaveAttribute("data-state", "active");

	await fireEvent.click(details);

	expect(details).toHaveAttribute("data-state", "active");
	expect(overview).toHaveAttribute("data-state", "inactive");
});
