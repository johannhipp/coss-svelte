<script lang="ts">
import Field from "../src/components/Field.svelte";
import NumberField from "../src/components/NumberField.svelte";
import NumberFieldDecrement from "../src/components/NumberFieldDecrement.svelte";
import NumberFieldGroup from "../src/components/NumberFieldGroup.svelte";
import NumberFieldIncrement from "../src/components/NumberFieldIncrement.svelte";
import NumberFieldInput from "../src/components/NumberFieldInput.svelte";
import NumberFieldScrubArea from "../src/components/NumberFieldScrubArea.svelte";
import type { NumberFieldReason } from "../src/internal/number-field.js";

let {
	initialValue = 1,
	defaultValue = initialValue,
	min = 0,
	max = 10,
	step = 1,
	smallStep = 0.1,
	largeStep = 5,
	locale = "en-US",
	format = {},
	rootLabel = "Quantity",
	useRootLabel = true,
	useField = false,
	useCustomChildren = true,
	required = false,
	disabled = false,
	readonly = false,
	invalid = false,
	allowWheelScrub = false,
}: {
	initialValue?: number | null;
	defaultValue?: number | null;
	min?: number;
	max?: number;
	step?: number;
	smallStep?: number;
	largeStep?: number;
	locale?: string;
	format?: Intl.NumberFormatOptions;
	rootLabel?: string | undefined;
	useRootLabel?: boolean;
	useField?: boolean;
	useCustomChildren?: boolean;
	required?: boolean;
	disabled?: boolean;
	readonly?: boolean;
	invalid?: boolean;
	allowWheelScrub?: boolean;
} = $props();

// This fixture intentionally treats the prop as an initial value for bind:value.
// svelte-ignore state_referenced_locally
let value = $state<number | null>(initialValue);
let changes = $state<string[]>([]);
let commits = $state<string[]>([]);

function recordChange(nextValue: number | null, reason: NumberFieldReason) {
	changes.push(`${nextValue ?? "null"}:${reason}`);
}

function recordCommit(nextValue: number | null, reason: NumberFieldReason) {
	commits.push(`${nextValue ?? "null"}:${reason}`);
}
</script>

{#snippet composedChildren()}
	<NumberFieldScrubArea>{rootLabel}</NumberFieldScrubArea>
	<NumberFieldGroup>
		<NumberFieldDecrement />
		<NumberFieldInput />
		<NumberFieldIncrement />
	</NumberFieldGroup>
{/snippet}

{#snippet control()}
	<NumberField
		bind:value
		{defaultValue}
		{min}
		{max}
		{step}
		{smallStep}
		{largeStep}
		{locale}
		{format}
		label={useRootLabel ? rootLabel : undefined}
		name="quantity"
		{required}
		{disabled}
		{readonly}
		{invalid}
		{allowWheelScrub}
		onValueChange={recordChange}
		onValueCommit={recordCommit}
		children={useCustomChildren ? composedChildren : undefined}
	/>
{/snippet}

<form data-testid="number-form">
	{#if useField}
		<Field
			label="Field quantity"
			description="Choose a quantity."
			error={invalid ? "Quantity is invalid." : ""}
			{required}
			{disabled}
			{invalid}
		>
			{@render control()}
		</Field>
	{:else}
		{@render control()}
	{/if}
	<button type="reset">Reset</button>
</form>

<output data-testid="number-value">{value ?? "null"}</output>
<output data-testid="number-changes">{changes.join("|")}</output>
<output data-testid="number-commits">{commits.join("|")}</output>
