<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { getFieldContext } from "../internal/field-context.svelte.js";
import {
	assertNumberFieldValue,
	type NumberFieldChangeDetails,
	resolveNumberFieldFormat,
	serializeInvariantNumber,
	validateNumberFieldConfig,
} from "../internal/number-field.js";
import {
	createNumberFieldState,
	type NumberFieldSize,
	setNumberFieldContext,
} from "../internal/number-field-context.svelte.js";
import { cn } from "../utils.js";
import NumberFieldDecrement from "./NumberFieldDecrement.svelte";
import NumberFieldGroup from "./NumberFieldGroup.svelte";
import NumberFieldIncrement from "./NumberFieldIncrement.svelte";
import NumberFieldInput from "./NumberFieldInput.svelte";
import NumberFieldScrubArea from "./NumberFieldScrubArea.svelte";

type Props = Omit<HTMLAttributes<HTMLDivElement>, "children" | "id"> & {
	ref?: HTMLDivElement | null;
	defaultValue?: number | null;
	value?: number | null;
	min?: number;
	max?: number;
	step?: number;
	smallStep?: number;
	largeStep?: number;
	locale?: string | string[];
	format?: Intl.NumberFormatOptions;
	label?: string;
	size?: NumberFieldSize;
	id?: string;
	name?: string;
	form?: string;
	required?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	invalid?: boolean;
	allowWheelScrub?: boolean;
	onValueChange?: (value: number | null, details: NumberFieldChangeDetails) => void;
	onValueCommit?: (value: number | null, details: NumberFieldChangeDetails) => void;
	class?: string;
	children?: Snippet;
};

let {
	defaultValue = null,
	value = $bindable(defaultValue),
	min,
	max,
	step = 1,
	smallStep = 0.1,
	largeStep = 10,
	locale = "en-US",
	format = {},
	label,
	size = "default",
	id,
	name,
	form,
	required,
	disabled,
	readonly = false,
	invalid,
	allowWheelScrub = false,
	onValueChange,
	onValueCommit,
	ref = $bindable(null),
	class: className = "",
	children,
	...rest
}: Props = $props();

// Form reset follows the initial default, not later prop changes.
// svelte-ignore state_referenced_locally
const resetValue = assertNumberFieldValue(defaultValue, "defaultValue");
const generatedId = $props.id();
const field = getFieldContext();
let inputId = $derived(id ?? field?.controlId ?? generatedId);
let resolvedLabel = $derived(label ?? (field?.hasLabel ? undefined : "Number"));
let resolvedRequired = $derived(required ?? field?.required ?? false);
let resolvedDisabled = $derived(disabled ?? field?.disabled ?? false);
let resolvedInvalid = $derived(invalid ?? field?.invalid ?? false);
let describedBy = $derived(field?.describedBy || undefined);
let config = $derived(validateNumberFieldConfig({ min, max, step, smallStep, largeStep }));
let validatedValue = $derived(assertNumberFieldValue(value));
let resolvedFormat = $derived(resolveNumberFieldFormat(locale, format, config));

const state = createNumberFieldState({
	getValue: () => validatedValue,
	setValue: (nextValue) => {
		value = nextValue;
	},
	getConfig: () => config,
	getLocale: () => locale,
	getFormat: () => resolvedFormat,
	getInputId: () => inputId,
	getLabel: () => resolvedLabel,
	getHasFieldLabel: () => field?.hasLabel ?? false,
	getSize: () => size,
	getForm: () => form,
	getRequired: () => resolvedRequired,
	getDisabled: () => resolvedDisabled,
	getReadonly: () => readonly,
	getInvalid: () => resolvedInvalid,
	getAllowWheelScrub: () => allowWheelScrub,
	getDescribedBy: () => describedBy,
	getOnValueChange: () => onValueChange,
	getOnValueCommit: () => onValueCommit,
});
setNumberFieldContext(state);

$effect(() => {
	const formElement = state.inputElement?.form;
	if (!formElement) return;

	const handleReset = (event: Event) => {
		state.reset(resetValue, event);
	};
	formElement.addEventListener("reset", handleReset);
	return () => formElement.removeEventListener("reset", handleReset);
});
</script>

<div
	bind:this={ref}
	{...rest}
	data-slot="number-field"
	data-size={state.size}
	data-disabled={state.disabled ? "" : undefined}
	data-readonly={state.readonly ? "" : undefined}
	data-invalid={state.invalid ? "" : undefined}
	class={cn("cn-number-field", className)}
>
	{#if children}
		{@render children()}
	{:else}
		{#if resolvedLabel}
			<NumberFieldScrubArea label={resolvedLabel} />
		{/if}
		<NumberFieldGroup>
			<NumberFieldDecrement />
			<NumberFieldInput />
			<NumberFieldIncrement />
		</NumberFieldGroup>
	{/if}
	{#if name}
		<input
			data-slot="number-field-hidden-input"
			type="hidden"
			{name}
			{form}
			disabled={state.disabled}
			value={serializeInvariantNumber(state.value)}
		/>
	{/if}
</div>
