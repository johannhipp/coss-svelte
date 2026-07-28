<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof DialogPrimitive.Close>, "child" | "children">;

let { ref = $bindable(null), class: className = "", ...rest }: Props = $props();

type DragState = { pointerId: number; popup: HTMLElement; startY: number; distance: number } | null;
let dragState: DragState = null;

function getPopup(target: EventTarget | null): HTMLElement | null {
	return target instanceof Element
		? target.closest<HTMLElement>('[data-slot="drawer-popup"]')
		: null;
}

function resetDrag(popup: HTMLElement): void {
	if (!popup) return;
	popup.removeAttribute("data-dragging");
	popup.style.removeProperty("--cn-drawer-drag-offset");
}

function capturePointer(target: EventTarget | null, pointerId: number): void {
	try {
		if (target instanceof Element) target.setPointerCapture?.(pointerId);
	} catch {
		// Synthetic pointer events used by test harnesses cannot be captured.
	}
}

function releasePointer(target: EventTarget | null, pointerId: number): void {
	try {
		if (target instanceof Element) target.releasePointerCapture?.(pointerId);
	} catch {
		// Synthetic pointer events used by test harnesses cannot be released.
	}
}

function handlePointerDown(event: PointerEvent): void {
	if (event.pointerType === "mouse" && event.button !== 0) return;

	const popup = getPopup(event.currentTarget);
	if (!popup) return;

	dragState = {
		pointerId: event.pointerId,
		popup,
		startY: event.clientY,
		distance: 0,
	};
	popup.setAttribute("data-dragging", "");
	capturePointer(event.currentTarget, event.pointerId);
	event.preventDefault();
}

function handlePointerMove(event: PointerEvent): void {
	if (!dragState || event.pointerId !== dragState.pointerId) return;

	dragState.distance = Math.max(0, event.clientY - dragState.startY);
	dragState.popup.style.setProperty("--cn-drawer-drag-offset", `${dragState.distance}px`);
}

function handlePointerUp(event: PointerEvent): void {
	if (!dragState || event.pointerId !== dragState.pointerId) return;

	const { popup, distance } = dragState;
	dragState = null;
	const shouldClose = distance >= 72 || distance >= popup.getBoundingClientRect().height * 0.35;

	releasePointer(event.currentTarget, event.pointerId);
	if (shouldClose) {
		resetDrag(popup);
		if (event.currentTarget instanceof HTMLElement) event.currentTarget.click();
		event.preventDefault();
		return;
	}

	resetDrag(popup);
}

function handlePointerCancel(event: PointerEvent): void {
	if (!dragState || event.pointerId !== dragState.pointerId) return;

	const { popup } = dragState;
	dragState = null;
	releasePointer(event.currentTarget, event.pointerId);
	resetDrag(popup);
}
</script>

<DialogPrimitive.Close
	bind:ref
	data-slot="drawer-create-handle"
	class={cn("cn-drawer-handle", className)}
	aria-label="Close drawer"
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
	onpointercancel={handlePointerCancel}
	{...rest}
></DialogPrimitive.Close>
