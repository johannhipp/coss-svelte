import { fireEvent, render, waitFor } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";
import ContextMenuFixture from "./ContextMenuFixture.svelte";

async function openWithPointer(trigger: HTMLElement) {
	await fireEvent.contextMenu(trigger, {
		button: 2,
		clientX: 40,
		clientY: 30,
	});
}

describe("ContextMenu interaction", () => {
	test("opens at a contextual pointer event and selects an action", async () => {
		const { getByRole, getByTestId, getByText } = render(ContextMenuFixture);
		const trigger = getByRole("button", { name: "File actions" });

		await openWithPointer(trigger);
		expect(getByTestId("context-open")).toHaveTextContent("true");
		expect(getByText("Unavailable")).toHaveAttribute("data-disabled");
		const linkItem = getByRole("menuitem", { name: "Open report" });
		expect(linkItem).toBeInstanceOf(HTMLAnchorElement);
		expect(linkItem).toHaveAttribute("href", "/files/report");

		await fireEvent.click(getByText("Rename"));
		expect(getByTestId("context-selected")).toHaveTextContent("rename");
		expect(getByTestId("context-open")).toHaveTextContent("false");
	});

	test("opens from Shift+F10 and keeps checkbox controls open", async () => {
		const { getByRole, getByTestId, getByText } = render(ContextMenuFixture);
		const trigger = getByRole("button", { name: "File actions" });
		trigger.focus();

		await fireEvent.keyDown(trigger, { key: "F10", shiftKey: true });
		await waitFor(() => expect(getByTestId("context-open")).toHaveTextContent("true"));

		await fireEvent.click(getByText("Show details"));
		expect(getByTestId("context-checked")).toHaveTextContent("true");
		expect(getByTestId("context-open")).toHaveTextContent("true");
	});

	test("supports keyboard navigation into a radio submenu", async () => {
		const { findByText, getByRole, getByTestId, getByText } = render(ContextMenuFixture);
		await openWithPointer(getByRole("button", { name: "File actions" }));

		const subTrigger = getByText("Sort by");
		subTrigger.focus();
		await fireEvent.keyDown(subTrigger, { key: "ArrowRight" });

		await fireEvent.click(await findByText("Date"));
		expect(getByTestId("context-sort")).toHaveTextContent("date");
	});
});
