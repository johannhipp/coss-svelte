<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";
import { getNumberFieldContext } from "../internal/number-field-context.svelte.js";
import { cn } from "../utils.js";

type Props = Omit<
	HTMLInputAttributes,
	| "children"
	| "defaultValue"
	| "disabled"
	| "form"
	| "id"
	| "max"
	| "min"
	| "name"
	| "oninput"
	| "onwheel"
	| "readonly"
	| "required"
	| "step"
	| "type"
	| "value"
> & {
	class?: string;
	ref?: HTMLInputElement | null;
};

let { ref = $bindable(null), class: className = "", ...rest }: Props = $props();

const state = getNumberFieldContext();
let describedBy = $derived(
	[rest["aria-describedby"], state.describedBy].filter(Boolean).join(" ") || undefined
);
let resolvedInvalid = $derived(
	rest["aria-invalid"] === true || rest["aria-invalid"] === "true" || state.invalid
		? true
		: undefined
);
let valueText = $derived(
	!state.focused && state.value !== null && state.formattedValue !== String(state.value)
		? state.formattedValue
		: undefined
);

$effect(() => {
	state.setInputElement(ref);
	return () => {
		if (state.inputElement === ref) state.setInputElement(null);
	};
});

function handleFocus(event: FocusEvent & { currentTarget: HTMLInputElement }) {
	rest.onfocus?.(event);
	if (!event.defaultPrevented) state.beginEdit();
}

function handleBlur(event: FocusEvent & { currentTarget: HTMLInputElement }) {
	rest.onblur?.(event);
	if (!event.defaultPrevented) state.endEdit(event);
}

function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
	if (state.disabled || state.readonly) return;
	state.updateEdit(event.currentTarget.value, event);
}

function handleKeydown(event: KeyboardEvent & { currentTarget: HTMLInputElement }) {
	rest.onkeydown?.(event);
	if (event.defaultPrevented) return;

	if (event.key === "Enter") {
		state.commitEdit("input", event);
		return;
	}
	if (event.key === "Escape") {
		if (state.cancelEdit()) event.preventDefault();
		return;
	}
	if (state.disabled || state.readonly) return;

	const direction = event.key === "ArrowDown" || event.key === "PageDown" ? -1 : 1;
	if (event.key === "ArrowUp" || event.key === "ArrowDown") {
		const amount = event.shiftKey
			? state.config.largeStep
			: event.altKey
				? state.config.smallStep
				: state.config.step;
		const previousValue = state.value;
		if (state.adjust(direction, amount, "keyboard", event)) {
			state.commit("keyboard", previousValue, event);
		}
		event.preventDefault();
		return;
	}
	if (event.key === "PageUp" || event.key === "PageDown") {
		const previousValue = state.value;
		if (state.adjust(direction, state.config.largeStep, "keyboard", event)) {
			state.commit("keyboard", previousValue, event);
		}
		event.preventDefault();
		return;
	}
	if (event.key === "Home" || event.key === "End") {
		const previousValue = state.value;
		const changed = state.setToBound(event.key === "Home" ? "min" : "max", "keyboard", event);
		if (changed) state.commit("keyboard", previousValue, event);
		if (state.config[event.key === "Home" ? "min" : "max"] !== undefined) {
			event.preventDefault();
		}
	}
}

function handleWheel(event: WheelEvent & { currentTarget: HTMLInputElement }) {
	if (
		!state.allowWheelScrub ||
		!state.focused ||
		state.disabled ||
		state.readonly ||
		event.deltaY === 0
	) {
		return;
	}

	const previousValue = state.value;
	const changed = state.adjust(event.deltaY < 0 ? 1 : -1, state.config.step, "wheel", event);
	if (changed) {
		state.commit("wheel", previousValue, event);
		event.preventDefault();
	}
}
</script>

<input
	bind:this={ref}
	{...rest}
	data-slot="number-field-input"
	data-size={state.size}
	data-invalid={state.invalid ? "" : undefined}
	class={cn("cn-number-field-input", className)}
	id={state.inputId}
	type="text"
	inputmode="decimal"
	role="spinbutton"
	value={state.editValue}
	form={state.form}
	required={state.required}
	disabled={state.disabled}
	readonly={state.readonly}
	aria-label={rest["aria-label"] ??
		(rest["aria-labelledby"] || state.hasScrubArea || state.hasFieldLabel
			? undefined
			: state.label)}
	aria-labelledby={rest["aria-labelledby"]}
	aria-describedby={describedBy}
	aria-invalid={resolvedInvalid}
	aria-required={state.required ? "true" : undefined}
	aria-readonly={state.readonly ? "true" : undefined}
	aria-disabled={state.disabled ? "true" : undefined}
	aria-valuenow={state.value ?? undefined}
	aria-valuemin={state.config.min}
	aria-valuemax={state.config.max}
	aria-valuetext={valueText}
	onfocus={handleFocus}
	onblur={handleBlur}
	oninput={handleInput}
	onkeydown={handleKeydown}
	onwheel={handleWheel}
/>
