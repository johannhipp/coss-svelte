<script>
import { Dialog as DialogPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", ...rest } = $props();

let dragState = null;

function getPopup(target) {
	return target.closest('[data-slot="drawer-popup"]');
}

function resetDrag(popup) {
	if (!popup) return;
	popup.removeAttribute("data-dragging");
	popup.style.removeProperty("--cn-drawer-drag-offset");
}

function capturePointer(target, pointerId) {
	try {
		target.setPointerCapture?.(pointerId);
	} catch {
		// Synthetic pointer events used by test harnesses cannot be captured.
	}
}

function releasePointer(target, pointerId) {
	try {
		target.releasePointerCapture?.(pointerId);
	} catch {
		// Synthetic pointer events used by test harnesses cannot be released.
	}
}

function handlePointerDown(event) {
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

function handlePointerMove(event) {
	if (!dragState || event.pointerId !== dragState.pointerId) return;

	dragState.distance = Math.max(0, event.clientY - dragState.startY);
	dragState.popup.style.setProperty("--cn-drawer-drag-offset", `${dragState.distance}px`);
}

function handlePointerUp(event) {
	if (!dragState || event.pointerId !== dragState.pointerId) return;

	const { popup, distance } = dragState;
	dragState = null;
	const shouldClose = distance >= 72 || distance >= popup.getBoundingClientRect().height * 0.35;

	releasePointer(event.currentTarget, event.pointerId);
	if (shouldClose) {
		resetDrag(popup);
		event.currentTarget.click();
		event.preventDefault();
		return;
	}

	resetDrag(popup);
}

function handlePointerCancel(event) {
	if (!dragState || event.pointerId !== dragState.pointerId) return;

	const { popup } = dragState;
	dragState = null;
	releasePointer(event.currentTarget, event.pointerId);
	resetDrag(popup);
}
</script>

<DialogPrimitive.Close
	data-slot="drawer-create-handle"
	class={cn("cn-drawer-handle", className)}
	aria-label="Close drawer"
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
	onpointercancel={handlePointerCancel}
	{...rest}
></DialogPrimitive.Close>
