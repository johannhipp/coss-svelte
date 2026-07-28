<script lang="ts">
import type { Snippet } from "svelte";
import { onDestroy } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { NUMBER_FIELD_SCRUB_THRESHOLD } from "../internal/number-field.js";
import { getNumberFieldContext } from "../internal/number-field-context.svelte.js";
import { cn } from "../utils.js";

type Props = Omit<
	HTMLAttributes<HTMLDivElement>,
	| "children"
	| "onlostpointercapture"
	| "onpointercancel"
	| "onpointerdown"
	| "onpointermove"
	| "onpointerup"
> & {
	label: string;
	class?: string;
	ref?: HTMLDivElement | null;
	children?: Snippet;
};

let { label, class: className = "", ref = $bindable(null), children, ...rest }: Props = $props();

const numberField = getNumberFieldContext();
const unregisterScrubArea = numberField.registerScrubArea();
let resolvedLabel = $derived(validateLabel(label));
let dragging = $state(false);
let activePointerId: number | undefined;
let remainder = 0;
let previousX = 0;
let interactionStart: number | null = null;
let interactionChanged = false;

function validateLabel(value: string): string {
	if (value.trim().length === 0) {
		throw new TypeError("NumberFieldScrubArea requires a non-empty label.");
	}
	return value;
}

function removeWindowBlurListener() {
	if (typeof window !== "undefined") window.removeEventListener("blur", handleWindowBlur);
}

function finishScrub(sourceEvent: Event | null) {
	if (!dragging) return;
	dragging = false;
	activePointerId = undefined;
	remainder = 0;
	removeWindowBlurListener();
	if (interactionChanged) numberField.commit("scrub", interactionStart, sourceEvent);
	interactionChanged = false;
}

function handleWindowBlur(event: Event) {
	finishScrub(event);
}

function handlePointerDown(event: PointerEvent & { currentTarget: HTMLDivElement }) {
	if (
		event.defaultPrevented ||
		event.button !== 0 ||
		event.isPrimary === false ||
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
	interactionStart = numberField.value;
	interactionChanged = false;
	numberField.inputElement?.focus({ preventScroll: true });
	event.currentTarget.setPointerCapture?.(event.pointerId);
	if (typeof window !== "undefined") window.addEventListener("blur", handleWindowBlur);
	event.preventDefault();
}

function handlePointerMove(event: PointerEvent & { currentTarget: HTMLDivElement }) {
	if (!dragging || activePointerId !== event.pointerId) return;

	remainder += event.clientX - previousX;
	previousX = event.clientX;
	const units = Math.trunc(remainder / NUMBER_FIELD_SCRUB_THRESHOLD);
	if (units !== 0) {
		interactionChanged =
			numberField.adjustByUnits(units, numberField.config.step, "scrub", event) ||
			interactionChanged;
		remainder -= units * NUMBER_FIELD_SCRUB_THRESHOLD;
	}
	event.preventDefault();
}

function handlePointerUp(event: PointerEvent & { currentTarget: HTMLDivElement }) {
	if (activePointerId === event.pointerId) finishScrub(event);
}

function handlePointerCancel(event: PointerEvent & { currentTarget: HTMLDivElement }) {
	if (activePointerId === event.pointerId) finishScrub(event);
}

function handleLostPointerCapture(event: PointerEvent & { currentTarget: HTMLDivElement }) {
	if (activePointerId === event.pointerId) finishScrub(event);
}

onDestroy(() => {
	if (dragging && interactionChanged) {
		numberField.commit("scrub", interactionStart, null);
	}
	dragging = false;
	removeWindowBlurListener();
	unregisterScrubArea();
});
</script>

<div
	bind:this={ref}
	{...rest}
	data-slot="number-field-scrub-area"
	data-size={numberField.size}
	data-dragging={dragging ? "" : undefined}
	data-disabled={numberField.disabled ? "" : undefined}
	class={cn("cn-number-field-scrub-area", className)}
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
	onpointercancel={handlePointerCancel}
	onlostpointercapture={handleLostPointerCapture}
>
	<label class="cn-number-field-scrub-label" for={numberField.inputId}>
		{#if children}
			<span aria-hidden="true">{@render children()}</span>
			<span class="cn-number-field-visually-hidden">{resolvedLabel}</span>
		{:else}
			{resolvedLabel}
		{/if}
	</label>
</div>
