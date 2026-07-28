<script lang="ts">
import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { getFieldContext, mergeFieldIds } from "../internal/field-context.svelte.js";
import { normalizeOptions, type Option } from "../internal/props.js";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof RadioGroupPrimitive.Root>, "child"> & {
	label?: string;
	options?: Option[];
};
let {
	ref = $bindable(null),
	value = $bindable(""),
	label = "",
	options = [],
	orientation = "vertical",
	id,
	disabled,
	required,
	class: className = "",
	children,
	...rest
}: Props = $props();

const generatedId = $props.id();
const field = getFieldContext();
let items = $derived(normalizeOptions(options));
let resolvedId = $derived(id ?? field?.controlId ?? generatedId);
let convenienceLabelId = $derived(`${resolvedId}-label`);
let resolvedDisabled = $derived(disabled ?? field?.disabled ?? false);
let resolvedRequired = $derived(required ?? field?.required ?? false);
let describedBy = $derived(mergeFieldIds(rest["aria-describedby"], field?.describedBy));
let labelledBy = $derived(
	rest["aria-labelledby"] ??
		(rest["aria-label"]
			? undefined
			: field?.hasLabel
				? field.labelId
				: label
					? convenienceLabelId
					: undefined)
);
let resolvedInvalid = $derived(rest["aria-invalid"] ?? (field?.invalid ? "true" : undefined));
</script>

<RadioGroupPrimitive.Root
	bind:ref
	{...rest}
	id={resolvedId}
	data-slot="radio-group"
	class={cn("cn-choice-group", className)}
	bind:value
	{orientation}
	disabled={resolvedDisabled}
	required={resolvedRequired}
	aria-labelledby={labelledBy}
	aria-describedby={describedBy}
	aria-invalid={resolvedInvalid}
>
	{#if label}
		<span id={convenienceLabelId} class="cn-choice-label">{label}</span>
	{/if}
	<div class="cn-choice-stack">
		{#if children}
			{@render children()}
		{:else if options.length}
			{#each items as normalized}
				<RadioGroupPrimitive.Item
					data-slot="radio-group-item"
					class="cn-radio"
					value={normalized.value}
					disabled={normalized.disabled}
				>
					{#snippet children({ checked })}
						<span
							class="cn-radio-indicator"
							data-state={checked ? "checked" : "unchecked"}
							aria-hidden="true"
						></span>
						<span>{normalized.label}</span>
					{/snippet}
				</RadioGroupPrimitive.Item>
			{/each}
		{/if}
	</div>
</RadioGroupPrimitive.Root>
