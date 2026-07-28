<script lang="ts">
import Field from "../src/components/Field.svelte";
import NumberField from "../src/components/NumberField.svelte";
import NumberFieldDecrement from "../src/components/NumberFieldDecrement.svelte";
import NumberFieldGroup from "../src/components/NumberFieldGroup.svelte";
import NumberFieldIncrement from "../src/components/NumberFieldIncrement.svelte";
import NumberFieldInput from "../src/components/NumberFieldInput.svelte";
import NumberFieldScrubArea from "../src/components/NumberFieldScrubArea.svelte";
import type { NumberFieldChangeDetails } from "../src/internal/number-field.js";

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
	customScrubContent = false,
	cancelArrowKeys = false,
	inputAriaLabel,
	inputDescribedBy,
}: {
	initialValue?: number | null;
	defaultValue?: number | null;
	min?: number;
	max?: number;
	step?: number;
	smallStep?: number;
	largeStep?: number;
	locale?: string | string[];
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
	customScrubContent?: boolean;
	cancelArrowKeys?: boolean;
	inputAriaLabel?: string;
	inputDescribedBy?: string;
} = $props();

// This fixture intentionally treats the prop as an initial value for bind:value.
// svelte-ignore state_referenced_locally
let value = $state<number | null>(initialValue);
// svelte-ignore state_referenced_locally
let activeDefault = $state<number | null>(defaultValue);
// svelte-ignore state_referenced_locally
let activeLocale = $state<string | string[]>(locale);
// svelte-ignore state_referenced_locally
let activeFormat = $state<Intl.NumberFormatOptions>(format);
let changes = $state<string[]>([]);
let commits = $state<string[]>([]);
let submissions = $state(0);

function recordChange(nextValue: number | null, details: NumberFieldChangeDetails) {
	changes.push(
		`${nextValue ?? "null"}:${details.reason}:${details.previousValue ?? "null"}:${details.sourceEvent?.type ?? "null"}`
	);
}

function recordCommit(nextValue: number | null, details: NumberFieldChangeDetails) {
	commits.push(
		`${nextValue ?? "null"}:${details.reason}:${details.previousValue ?? "null"}:${details.sourceEvent?.type ?? "null"}`
	);
}

function handleSubmit(event: SubmitEvent) {
	event.preventDefault();
	submissions += 1;
}

function handleInputKeydown(event: KeyboardEvent) {
	if (cancelArrowKeys && event.key.startsWith("Arrow")) event.preventDefault();
}
</script>

{#snippet composedChildren()}
	{#if customScrubContent}
		<NumberFieldScrubArea label={rootLabel ?? "Quantity"}>
			<strong>Drag quantity</strong>
		</NumberFieldScrubArea>
	{:else}
		<NumberFieldScrubArea label={rootLabel ?? "Quantity"} />
	{/if}
	<NumberFieldGroup>
		<NumberFieldDecrement />
		<NumberFieldInput
			aria-label={inputAriaLabel}
			aria-describedby={inputDescribedBy}
			onkeydown={handleInputKeydown}
		/>
		<NumberFieldIncrement />
	</NumberFieldGroup>
{/snippet}

{#snippet control()}
	<NumberField
		bind:value
		defaultValue={activeDefault}
		{min}
		{max}
		{step}
		{smallStep}
		{largeStep}
		locale={activeLocale}
		format={activeFormat}
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

<form data-testid="number-form" onsubmit={handleSubmit}>
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
	<button type="submit">Submit</button>
</form>

<button data-testid="external-write" type="button" onclick={() => (value = 7.25)}>
	Set external value
</button>
<button data-testid="default-write" type="button" onclick={() => (activeDefault = 8)}>
	Change default
</button>
<button
	data-testid="locale-write"
	type="button"
	onclick={() => (activeLocale = activeLocale === "de-DE" ? "en-US" : "de-DE")}
>
	Change locale
</button>
<button
	data-testid="format-write"
	type="button"
	onclick={() => (activeFormat = { style: "percent", maximumFractionDigits: 1 })}
>
	Change format
</button>
{#if inputDescribedBy}
	<p id={inputDescribedBy}>Consumer description.</p>
{/if}
<output data-testid="number-value">{value ?? "null"}</output>
<output data-testid="number-changes">{changes.join("|")}</output>
<output data-testid="number-commits">{commits.join("|")}</output>
<output data-testid="number-submissions">{submissions}</output>
