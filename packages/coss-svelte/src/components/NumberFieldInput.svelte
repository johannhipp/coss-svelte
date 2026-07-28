<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";
import { getNumberFieldContext } from "../internal/number-field-context.svelte.js";
import { cn } from "../utils.js";

type Props = Omit<
	HTMLInputAttributes,
	"children" | "disabled" | "form" | "id" | "name" | "readonly" | "required" | "type" | "value"
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
	state.value !== null && state.formattedValue !== String(state.value)
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
	state.endEdit();
}

function handleInput(event: Event & { currentTarget: HTMLInputElement }) {
	rest.oninput?.(event);
	if (event.defaultPrevented || state.disabled || state.readonly) return;
	state.updateEdit(event.currentTarget.value);
}

function handleKeydown(event: KeyboardEvent & { currentTarget: HTMLInputElement }) {
	rest.onkeydown?.(event);
	if (event.defaultPrevented) return;

	if (event.key === "Enter") {
		state.commitEdit("input");
		event.preventDefault();
		return;
	}
	if (event.key === "Escape") {
		state.cancelEdit();
		event.preventDefault();
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
		state.adjust(direction, amount, "keyboard");
		state.commit("keyboard");
		event.preventDefault();
		return;
	}
	if (event.key === "PageUp" || event.key === "PageDown") {
		state.adjust(direction, state.config.largeStep, "keyboard");
		state.commit("keyboard");
		event.preventDefault();
		return;
	}
	if (event.key === "Home" || event.key === "End") {
		const changed = state.setToBound(event.key === "Home" ? "min" : "max", "keyboard");
		if (changed) state.commit("keyboard");
		if (state.config[event.key === "Home" ? "min" : "max"] !== undefined) {
			event.preventDefault();
		}
	}
}

function handleWheel(event: WheelEvent & { currentTarget: HTMLInputElement }) {
	rest.onwheel?.(event);
	if (
		event.defaultPrevented ||
		!state.allowWheelScrub ||
		!state.focused ||
		state.disabled ||
		state.readonly ||
		event.deltaY === 0
	) {
		return;
	}

	const changed = state.adjust(event.deltaY < 0 ? 1 : -1, state.config.step, "wheel");
	if (changed) {
		state.commit("wheel");
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
	aria-label={rest["aria-label"] ?? (rest["aria-labelledby"] ? undefined : state.label)}
	aria-labelledby={rest["aria-labelledby"]}
	aria-describedby={describedBy}
	aria-invalid={resolvedInvalid}
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
