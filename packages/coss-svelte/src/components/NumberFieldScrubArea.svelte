<script lang="ts">
import type { Snippet } from "svelte";
import { onDestroy } from "svelte";
import type { HTMLLabelAttributes } from "svelte/elements";
import { NUMBER_FIELD_SCRUB_THRESHOLD } from "../internal/number-field.js";
import { getNumberFieldContext } from "../internal/number-field-context.svelte.js";
import { cn } from "../utils.js";

type Props = Omit<HTMLLabelAttributes, "children" | "for"> & {
	class?: string;
	children?: Snippet;
};

let { class: className = "", children, ...rest }: Props = $props();

const numberField = getNumberFieldContext();
let dragging = $state(false);
let activePointerId: number | undefined;
let remainder = 0;
let previousX = 0;
let previousUserSelect = "";
let previousCursor = "";
let documentInteractionActive = false;

function restoreDocumentInteraction() {
	if (!documentInteractionActive || typeof document === "undefined") return;
	document.documentElement.style.userSelect = previousUserSelect;
	document.documentElement.style.cursor = previousCursor;
	documentInteractionActive = false;
}

function removeWindowBlurListener() {
	if (typeof window !== "undefined") window.removeEventListener("blur", finishScrub);
}

function finishScrub() {
	if (!dragging) return;
	dragging = false;
	activePointerId = undefined;
	remainder = 0;
	restoreDocumentInteraction();
	removeWindowBlurListener();
	numberField.commit("scrub");
}

function handlePointerDown(event: PointerEvent & { currentTarget: HTMLLabelElement }) {
	rest.onpointerdown?.(event);
	if (
		event.defaultPrevented ||
		event.button !== 0 ||
		event.pointerType === "touch" ||
		dragging ||
		numberField.disabled ||
		numberField.readonly
	) {
		return;
	}

	dragging = true;
	activePointerId = event.pointerId;
	remainder = 0;
	previousX = event.clientX;
	event.currentTarget.setPointerCapture?.(event.pointerId);
	if (typeof document !== "undefined") {
		previousUserSelect = document.documentElement.style.userSelect;
		previousCursor = document.documentElement.style.cursor;
		document.documentElement.style.userSelect = "none";
		document.documentElement.style.cursor = "ew-resize";
		documentInteractionActive = true;
	}
	if (typeof window !== "undefined") window.addEventListener("blur", finishScrub);
	event.preventDefault();
}

function handlePointerMove(event: PointerEvent & { currentTarget: HTMLLabelElement }) {
	rest.onpointermove?.(event);
	if (!dragging || activePointerId !== event.pointerId) return;

	remainder += event.clientX - previousX;
	previousX = event.clientX;
	const units = Math.trunc(remainder / NUMBER_FIELD_SCRUB_THRESHOLD);
	if (units !== 0) {
		numberField.adjustByUnits(units, numberField.config.step, "scrub");
		remainder -= units * NUMBER_FIELD_SCRUB_THRESHOLD;
	}
	event.preventDefault();
}

function handlePointerUp(event: PointerEvent & { currentTarget: HTMLLabelElement }) {
	rest.onpointerup?.(event);
	if (activePointerId === event.pointerId) finishScrub();
}

function handlePointerCancel(event: PointerEvent & { currentTarget: HTMLLabelElement }) {
	rest.onpointercancel?.(event);
	if (activePointerId === event.pointerId) finishScrub();
}

function handleLostPointerCapture(event: PointerEvent & { currentTarget: HTMLLabelElement }) {
	rest.onlostpointercapture?.(event);
	if (activePointerId === event.pointerId) finishScrub();
}

onDestroy(() => {
	dragging = false;
	restoreDocumentInteraction();
	removeWindowBlurListener();
});
</script>

<label
	{...rest}
	data-slot="number-field-scrub-area"
	data-size={numberField.size}
	data-dragging={dragging ? "" : undefined}
	data-disabled={numberField.disabled ? "" : undefined}
	class={cn("cn-number-field-scrub-area", className)}
	for={numberField.inputId}
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
	onpointercancel={handlePointerCancel}
	onlostpointercapture={handleLostPointerCapture}
>
	{#if children}
		{@render children()}
	{:else}
		{numberField.label}
	{/if}
</label>
