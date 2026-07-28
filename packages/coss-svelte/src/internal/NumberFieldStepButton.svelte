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
	children?: Snippet;
};

let {
	direction,
	reason,
	label,
	dataSlot,
	className,
	class: consumerClass = "",
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
	if (typeof window !== "undefined") window.removeEventListener("blur", finishPress);
}

function finishPress() {
	if (!pressActive) return;
	pressActive = false;
	activePointerId = undefined;
	clearTimers();
	removeWindowBlurListener();
	state.commit(reason);
	releaseClickSuppressionSoon();
}

function handlePointerDown(event: PointerEvent & { currentTarget: HTMLButtonElement }) {
	onpointerdown?.(event);
	if (event.defaultPrevented || event.button !== 0 || isDisabled) return;

	clearTimeout(suppressClickTimer);
	suppressClickTimer = undefined;
	pressActive = true;
	suppressNextClick = true;
	activePointerId = event.pointerId;
	event.currentTarget.setPointerCapture?.(event.pointerId);
	state.adjust(direction, state.config.step, reason);
	delayTimer = setTimeout(() => {
		repeatTimer = setInterval(() => {
			state.adjust(direction, state.config.step, reason);
		}, NUMBER_FIELD_REPEAT_INTERVAL);
	}, NUMBER_FIELD_PRESS_DELAY);
	if (typeof window !== "undefined") window.addEventListener("blur", finishPress);
	event.preventDefault();
}

function handlePointerUp(event: PointerEvent & { currentTarget: HTMLButtonElement }) {
	onpointerup?.(event);
	if (activePointerId === event.pointerId) finishPress();
}

function handlePointerCancel(event: PointerEvent & { currentTarget: HTMLButtonElement }) {
	onpointercancel?.(event);
	if (activePointerId === event.pointerId) finishPress();
}

function handleLostPointerCapture(event: PointerEvent & { currentTarget: HTMLButtonElement }) {
	onlostpointercapture?.(event);
	if (activePointerId === event.pointerId) finishPress();
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
	if (state.adjust(direction, state.config.step, reason)) state.commit(reason);
}

onDestroy(() => {
	pressActive = false;
	suppressNextClick = false;
	clearTimers();
	clearTimeout(suppressClickTimer);
	removeWindowBlurListener();
});
</script>

<button
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
	{...rest}
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
