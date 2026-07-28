import { fireEvent, render, waitFor } from "@testing-library/svelte";
import { afterEach, describe, expect, test, vi } from "vitest";
import ContextMenuChildFixture from "./ContextMenuChildFixture.svelte";
import ContextMenuFixture from "./ContextMenuFixture.svelte";
import ContextMenuPortalFixture from "./ContextMenuPortalFixture.svelte";

afterEach(() => {
	vi.useRealTimers();
});

async function openWithPointer(trigger: HTMLElement, clientX = 40, clientY = 30) {
	await fireEvent.contextMenu(trigger, {
		button: 2,
		clientX,
		clientY,
	});
}

describe("ContextMenu root and trigger", () => {
	test("opens at one contextual pointer event and composes cancellation first", async () => {
		const openChanges = vi.fn();
		const { getByRole, getByTestId, getByText, unmount } = render(ContextMenuFixture, {
			props: { onOpenChange: openChanges },
		});
		const trigger = getByRole("button", { name: "File actions" });

		await openWithPointer(trigger);
		expect(getByTestId("context-open")).toHaveTextContent("true");
		expect(getByTestId("context-point")).toHaveTextContent("40,30");
		expect(openChanges).toHaveBeenCalledTimes(1);
		expect(openChanges).toHaveBeenLastCalledWith(true);
		await fireEvent.click(getByText("Rename"));
		await waitFor(() => expect(getByTestId("context-open")).toHaveTextContent("false"));
		unmount();

		const prevented = render(ContextMenuFixture, {
			props: { preventContextMenu: true },
		});
		await openWithPointer(prevented.getByRole("button", { name: "File actions" }));
		expect(prevented.getByTestId("context-open")).toHaveTextContent("false");
	});

	test("opens from Shift+F10 and ContextMenu at the current target center", async () => {
		const { getByRole, getByTestId } = render(ContextMenuFixture);
		const trigger = getByRole("button", { name: "File actions" });
		vi.spyOn(trigger, "getBoundingClientRect").mockReturnValue(
			DOMRect.fromRect({ x: 10, y: 20, width: 100, height: 40 })
		);
		trigger.focus();

		expect(await fireEvent.keyDown(trigger, { key: "F10", shiftKey: true })).toBe(false);
		await waitFor(() => expect(getByTestId("context-open")).toHaveTextContent("true"));
		expect(getByTestId("context-point")).toHaveTextContent("60,40");
		expect(getByTestId("context-open-changes")).toHaveTextContent("true");

		await fireEvent.keyDown(getByRole("menu"), { key: "Escape" });
		await waitFor(() => expect(getByTestId("context-open")).toHaveTextContent("false"));
		expect(document.activeElement).toBe(trigger);

		expect(await fireEvent.keyDown(trigger, { key: "ContextMenu" })).toBe(false);
		await waitFor(() => expect(getByTestId("context-open")).toHaveTextContent("true"));
		expect(getByTestId("context-open-changes")).toHaveTextContent("true,false,true");
		await fireEvent.keyDown(getByRole("menu"), { key: "Escape" });
		await waitFor(() => expect(getByTestId("context-open")).toHaveTextContent("false"));
	});

	test("honors prevented and disabled keyboard paths", async () => {
		for (const props of [{ preventKeyboard: true }, { disabled: true }]) {
			const instance = render(ContextMenuFixture, { props });
			const trigger = instance.getByRole("button", { name: "File actions" });
			await fireEvent.keyDown(trigger, { key: "F10", shiftKey: true });
			await fireEvent.keyDown(trigger, { key: "ContextMenu" });
			expect(instance.getByTestId("context-open")).toHaveTextContent("false");
			expect(instance.getByTestId("context-open-changes")).toHaveTextContent(/^$/);
			instance.unmount();
		}
	});

	test("retains Bits long-press behavior and clears every canceled timer", async () => {
		vi.useFakeTimers();
		const onOpenChange = vi.fn();
		const instance = render(ContextMenuFixture, { props: { onOpenChange } });
		const trigger = instance.getByRole("button", { name: "File actions" });

		await fireEvent.pointerDown(trigger, {
			isPrimary: true,
			pointerId: 1,
			pointerType: "touch",
			clientX: 12,
			clientY: 14,
		});
		await vi.advanceTimersByTimeAsync(699);
		expect(instance.getByTestId("context-open")).toHaveTextContent("false");
		await vi.advanceTimersByTimeAsync(1);
		expect(instance.getByTestId("context-open")).toHaveTextContent("true");
		expect(onOpenChange).toHaveBeenCalledOnce();
		await fireEvent.click(instance.getByText("Rename"));
		expect(instance.getByTestId("context-open")).toHaveTextContent("false");
		instance.unmount();

		for (const terminal of ["pointerMove", "pointerUp", "pointerCancel"] as const) {
			const canceled = render(ContextMenuFixture);
			const canceledTrigger = canceled.getByRole("button", { name: "File actions" });
			await fireEvent.pointerDown(canceledTrigger, {
				isPrimary: true,
				pointerId: 2,
				pointerType: "pen",
			});
			await fireEvent[terminal](canceledTrigger, {
				isPrimary: true,
				pointerId: 2,
				pointerType: "pen",
			});
			await vi.advanceTimersByTimeAsync(800);
			expect(canceled.getByTestId("context-open")).toHaveTextContent("false");
			canceled.unmount();
		}

		const destroyedChange = vi.fn();
		const destroyed = render(ContextMenuFixture, {
			props: { onOpenChange: destroyedChange },
		});
		await fireEvent.pointerDown(destroyed.getByRole("button", { name: "File actions" }), {
			isPrimary: true,
			pointerId: 3,
			pointerType: "touch",
		});
		destroyed.unmount();
		await vi.advanceTimersByTimeAsync(800);
		expect(destroyedChange).not.toHaveBeenCalled();
	});
});

describe("ContextMenu items and composition", () => {
	test("selects actions and preserves disabled, inset, and destructive state", async () => {
		const { getByRole, getByTestId, getByText } = render(ContextMenuFixture);
		const trigger = getByRole("button", { name: "File actions" });
		await openWithPointer(trigger);

		expect(getByText("Unavailable")).toHaveAttribute("data-disabled");
		await fireEvent.click(getByText("Keep open"));
		expect(getByTestId("context-canceled")).toHaveTextContent("1");
		expect(getByTestId("context-open")).toHaveTextContent("true");

		await fireEvent.click(getByText("Rename"));
		expect(getByTestId("context-selected")).toHaveTextContent("rename");
		expect(getByTestId("context-open")).toHaveTextContent("false");
	});

	test("[runtime:context-menu-binding] binds checkbox, indeterminate, and radio state", async () => {
		const { findByText, getByRole, getByTestId, getByText } = render(ContextMenuFixture, {
			props: { startIndeterminate: true },
		});
		await openWithPointer(getByRole("button", { name: "File actions" }));

		const checkbox = getByRole("menuitemcheckbox", { name: "Show details" });
		expect(checkbox).toHaveAttribute("aria-checked", "mixed");
		await fireEvent.click(checkbox);
		expect(getByTestId("context-checked")).toHaveTextContent("true");
		expect(getByTestId("context-indeterminate")).toHaveTextContent("false");
		expect(getByTestId("context-open")).toHaveTextContent("true");

		const subTrigger = getByText("Sort by");
		subTrigger.focus();
		await fireEvent.keyDown(subTrigger, { key: "ArrowRight" });
		await fireEvent.click(await findByText("Date"));
		expect(getByTestId("context-sort")).toHaveTextContent("date");
	});

	test("renders one semantic link with an anchor ref and navigation attributes", async () => {
		const { getByRole, getByTestId } = render(ContextMenuFixture);
		await openWithPointer(getByRole("button", { name: "File actions" }));
		const linkItem = getByRole("menuitem", { name: "Open report" });

		expect(linkItem).toBeInstanceOf(HTMLAnchorElement);
		expect(linkItem).toHaveAttribute("href", "/files/report");
		expect(linkItem).toHaveAttribute("target", "_blank");
		expect(linkItem).toHaveAttribute("rel", "noreferrer");
		expect(linkItem.querySelector("a")).toBeNull();
		expect(getByTestId("context-link-ref")).toHaveTextContent("A");
		await fireEvent.keyDown(getByRole("menu"), { key: "Escape" });
		await waitFor(() => expect(getByTestId("context-open")).toHaveTextContent("false"));
	});

	test("lands merged Bits props, data, handlers, and refs on child targets", async () => {
		const { getByRole, getByTestId } = render(ContextMenuChildFixture);
		const trigger = getByRole("button", { name: "Child trigger" });
		expect(getByTestId("child-trigger-ref")).toHaveTextContent("BUTTON");
		await openWithPointer(trigger);

		const item = getByRole("menuitem", { name: "Child action" });
		expect(item).toBeInstanceOf(HTMLButtonElement);
		expect(item).toHaveAttribute("data-slot", "context-menu-item");
		expect(item).toHaveAttribute("data-inset");
		expect(item).toHaveAttribute("data-variant", "destructive");
		expect(getByTestId("child-item-ref")).toHaveTextContent("BUTTON");
		await fireEvent.click(item);
		expect(getByTestId("child-selected")).toHaveTextContent("true");
		expect(getByTestId("child-open")).toHaveTextContent("false");
	});

	test("supports typeahead and looped arrow navigation", async () => {
		const { getAllByRole, getByRole } = render(ContextMenuFixture);
		const trigger = getByRole("button", { name: "File actions" });
		await openWithPointer(trigger);
		const items = getAllByRole("menuitem");
		const firstEnabled = getByRole("menuitem", { name: /Rename/ });
		const last = getByRole("menuitem", { name: "Open report" });

		last.focus();
		await fireEvent.keyDown(last, { key: "ArrowDown" });
		expect(document.activeElement).toBe(firstEnabled);
		getByRole("menuitemcheckbox", { name: "Show details" }).focus();
		await fireEvent.keyDown(document.activeElement as HTMLElement, { key: "r" });
		await waitFor(() => expect(document.activeElement).toBe(firstEnabled));
		expect(items.length).toBeGreaterThan(3);
		await fireEvent.keyDown(getByRole("menu"), { key: "Escape" });
	});
});

describe("ContextMenu submenu direction and portals", () => {
	test("uses root direction for submenu placement, chevron, and nested Escape order", async () => {
		const { getByRole, getByTestId, getByText } = render(ContextMenuFixture, {
			props: { dir: "rtl" },
		});
		const trigger = getByRole("button", { name: "File actions" });
		await openWithPointer(trigger);
		const subTrigger = getByText("Sort by");
		expect(subTrigger).toHaveAttribute("data-direction", "rtl");
		expect(subTrigger.querySelector("svg")).toHaveAttribute("data-direction", "rtl");

		subTrigger.focus();
		await fireEvent.keyDown(subTrigger, { key: "ArrowLeft" });
		await waitFor(() => expect(getByTestId("context-sub-open")).toHaveTextContent("true"));
		const subPopup = document.querySelector('[data-slot="context-menu-sub-popup"]') as HTMLElement;
		expect(subPopup).toHaveAttribute("data-side", "left");

		const firstRadio = getByRole("menuitemradio", { name: "Name" });
		firstRadio.focus();
		await fireEvent.keyDown(firstRadio, { key: "Escape" });
		await waitFor(() => expect(getByTestId("context-sub-open")).toHaveTextContent("false"));
		expect(getByTestId("context-open")).toHaveTextContent("true");
		expect(document.activeElement).toBe(subTrigger);
		await fireEvent.keyDown(getByRole("menu"), { key: "Escape" });
		await waitFor(() => expect(getByTestId("context-open")).toHaveTextContent("false"));
		await waitFor(() => expect(document.activeElement).toBe(trigger));
	});

	test("uses deliberate root popup placement defaults", async () => {
		const { getByRole } = render(ContextMenuFixture);
		await openWithPointer(getByRole("button", { name: "File actions" }));
		const popup = document.querySelector('[data-slot="context-menu-popup"]') as HTMLElement;
		expect(popup).toHaveAttribute("data-side", "bottom");
		expect(popup).toHaveAttribute("data-align", "center");
		await fireEvent.keyDown(getByRole("menu"), { key: "Escape" });
	});

	test.each(["selector", "element", "inline"] as const)("supports %s portal mode", async (mode) => {
		const { getByRole, getByTestId } = render(ContextMenuPortalFixture, {
			props: { mode },
		});
		await openWithPointer(getByRole("button", { name: "Portal trigger" }));
		const item = getByRole("menuitem", { name: "Portal item" });
		const expectedParent =
			mode === "inline"
				? getByTestId("context-inline-parent")
				: getByTestId("context-portal-target");
		expect(expectedParent.contains(item)).toBe(true);
		await fireEvent.click(item);
	});
});
