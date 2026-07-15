import { fireEvent, render } from "@testing-library/svelte";
import { expect, test } from "vitest";
import SidebarFixture from "./SidebarFixture.svelte";
import ToastFixture from "./ToastFixture.svelte";

test("SidebarProvider owns toggle state consumed by Sidebar and SidebarTrigger", async () => {
	const { container, getByRole } = render(SidebarFixture);
	const sidebar = container.querySelector('[data-slot="sidebar"]');
	const trigger = getByRole("button", { name: "Toggle Sidebar" });

	expect(sidebar).toHaveAttribute("data-state", "expanded");
	expect(trigger).toHaveAttribute("aria-expanded", "true");

	await fireEvent.click(trigger);

	expect(sidebar).toHaveAttribute("data-state", "collapsed");
	expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("Toast exposes a dismissible live region", async () => {
	const { getByRole, queryByRole } = render(ToastFixture);
	const toast = getByRole("status");

	expect(toast).toHaveAttribute("aria-live", "polite");
	await fireEvent.click(getByRole("button", { name: "Dismiss notification" }));

	expect(queryByRole("status")).not.toBeInTheDocument();
});
