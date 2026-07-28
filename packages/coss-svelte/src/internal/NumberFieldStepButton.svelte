<script lang="ts">
import type { Snippet } from "svelte";
import { onDestroy } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../utils.js";
import {
	NUMBER_FIELD_PRESS_DELAY,
	NUMBER_FIELD_REPEAT_INTERVAL,
	type NumberFieldDirection,
	type NumberFieldReason,
} from "./number-field.js";
import { getNumberFieldContext } from "./number-field-context.svelte.js";

type Props = Omit<HTMLButtonAttributes, "children" | "disabled" | "type"> & {
	direction: NumberFieldDirection;
	reason: Extract<NumberFieldReason, "increment" | "decrement">;
	label: string;
	dataSlot: string;
	className: string;
	class?: string;
	ref?: HTMLButtonElement | null;
	children?: Snippet;
};

let {
	direction,
	reason,
	label,
	dataSlot,
	className,
	class: consumerClass = "",
	ref = $bindable(null),
	children,
	"aria-label": ariaLabel,
	onpointerdown,
	onpointerup,
	onpointercancel,
	onlostpointercapture,
	onclick,
	...rest
}: Props = $props();

const state = getNumberFieldContext();
let delayTimer: ReturnType<typeof setTimeout> | undefined;
let repeatTimer: ReturnType<typeof setInterval> | undefined;
let suppressClickTimer: ReturnType<typeof setTimeout> | undefined;
let pressActive = false;
let suppressNextClick = false;
let activePointerId: number | undefined;
let interactionStart: number | null = null;
let initiatingEvent: PointerEvent | null = null;
let interactionChanged = false;
let isDisabled = $derived(direction > 0 ? state.incrementDisabled : state.decrementDisabled);

function clearTimers() {
	clearTimeout(delayTimer);
	clearInterval(repeatTimer);
	delayTimer = undefined;
	repeatTimer = undefined;
}

function releaseClickSuppressionSoon() {
	clearTimeout(suppressClickTimer);
	suppressClickTimer = setTimeout(() => {
		suppressNextClick = false;
		suppressClickTimer = undefined;
	}, 0);
}

function removeWindowBlurListener() {
	if (typeof window !== "undefined") window.removeEventListener("blur", handleWindowBlur);
}

function finishPress(sourceEvent: Event | null) {
	if (!pressActive) return;
	pressActive = false;
	activePointerId = undefined;
	clearTimers();
	removeWindowBlurListener();
	if (interactionChanged) state.commit(reason, interactionStart, sourceEvent);
	interactionChanged = false;
	initiatingEvent = null;
	releaseClickSuppressionSoon();
}

function handleWindowBlur(event: Event) {
	finishPress(event);
}

function handlePointerDown(event: PointerEvent & { currentTarget: HTMLButtonElement }) {
	onpointerdown?.(event);
	if (
		event.defaultPrevented ||
		event.button !== 0 ||
		event.isPrimary === false ||
		pressActive ||
		isDisabled
	) {
		return;
	}

	clearTimeout(suppressClickTimer);
	suppressClickTimer = undefined;
	pressActive = true;
	suppressNextClick = true;
	activePointerId = event.pointerId;
	interactionStart = state.value;
	initiatingEvent = event;
	interactionChanged = false;
	event.currentTarget.setPointerCapture?.(event.pointerId);
	state.inputElement?.focus({ preventScroll: true });
	interactionChanged =
		state.adjust(direction, state.config.step, reason, event) || interactionChanged;
	delayTimer = setTimeout(() => {
		repeatTimer = setInterval(() => {
			interactionChanged =
				state.adjust(direction, state.config.step, reason, initiatingEvent) || interactionChanged;
		}, NUMBER_FIELD_REPEAT_INTERVAL);
	}, NUMBER_FIELD_PRESS_DELAY);
	if (typeof window !== "undefined") window.addEventListener("blur", handleWindowBlur);
	event.preventDefault();
}

function handlePointerUp(event: PointerEvent & { currentTarget: HTMLButtonElement }) {
	onpointerup?.(event);
	if (activePointerId === event.pointerId) finishPress(event);
}

function handlePointerCancel(event: PointerEvent & { currentTarget: HTMLButtonElement }) {
	onpointercancel?.(event);
	if (activePointerId === event.pointerId) finishPress(event);
}

function handleLostPointerCapture(event: PointerEvent & { currentTarget: HTMLButtonElement }) {
	onlostpointercapture?.(event);
	if (activePointerId === event.pointerId) finishPress(event);
}

function handleClick(event: MouseEvent & { currentTarget: HTMLButtonElement }) {
	onclick?.(event);
	if (event.defaultPrevented || isDisabled) return;
	if (suppressNextClick) {
		suppressNextClick = false;
		clearTimeout(suppressClickTimer);
		suppressClickTimer = undefined;
		return;
	}

	const previousValue = state.value;
	if (state.adjust(direction, state.config.step, reason, event)) {
		state.commit(reason, previousValue, event);
	}
}

onDestroy(() => {
	if (pressActive && interactionChanged) {
		state.commit(reason, interactionStart, null);
	}
	pressActive = false;
	suppressNextClick = false;
	clearTimers();
	clearTimeout(suppressClickTimer);
	removeWindowBlurListener();
});
</script>

<button
	bind:this={ref}
	{...rest}
	data-slot={dataSlot}
	data-size={state.size}
	class={cn(className, consumerClass)}
	type="button"
	disabled={isDisabled}
	aria-label={ariaLabel ?? label}
	onpointerdown={handlePointerDown}
	onpointerup={handlePointerUp}
	onpointercancel={handlePointerCancel}
	onlostpointercapture={handleLostPointerCapture}
	onclick={handleClick}
>
	{#if children}
		{@render children()}
	{:else if direction < 0}
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path d="M3.5 8h9" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" />
		</svg>
	{:else}
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path
				d="M8 3.5v9M3.5 8h9"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-width="1.5"
			/>
		</svg>
	{/if}
</button>
