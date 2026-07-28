<script lang="ts">
import { Checkbox as CheckboxPrimitive, Label as LabelPrimitive, useId } from "bits-ui";
import type { ComponentProps } from "svelte";
import { getFieldContext, mergeFieldIds } from "../internal/field-context.svelte.js";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof CheckboxPrimitive.Root>, "children" | "child" | "name"> & {
	id?: string;
	name?: string;
	label?: string;
	class?: string;
};

let {
	ref = $bindable(null),
	id,
	checked = $bindable(false),
	indeterminate = $bindable(false),
	label = "",
	disabled,
	required,
	class: className = "",
	...rest
}: Props = $props();

const generatedId = useId();
const field = getFieldContext();
let resolvedId = $derived(id ?? field?.controlId ?? generatedId);
let resolvedDisabled = $derived(disabled ?? field?.disabled ?? false);
let resolvedRequired = $derived(required ?? field?.required ?? false);
let describedBy = $derived(mergeFieldIds(rest["aria-describedby"], field?.describedBy));
let resolvedInvalid = $derived(rest["aria-invalid"] ?? (field?.invalid ? "true" : undefined));
</script>

<span data-slot="checkbox-field" class="cn-checkbox-field">
	<CheckboxPrimitive.Root
	bind:ref
		{...rest}
		id={resolvedId}
		data-slot="checkbox"
		class={cn("cn-checkbox", className)}
		bind:checked
		bind:indeterminate
		disabled={resolvedDisabled}
		required={resolvedRequired}
		aria-describedby={describedBy}
		aria-invalid={resolvedInvalid}
	>
		{#snippet children({ checked, indeterminate })}
			<span
				class="cn-checkbox-indicator"
				data-state={indeterminate ? "indeterminate" : checked ? "checked" : "unchecked"}
				aria-hidden="true"
			>
				{#if indeterminate}
					-
				{/if}
			</span>
		{/snippet}
	</CheckboxPrimitive.Root>
	{#if label}
		<LabelPrimitive.Root for={resolvedId} class="cn-checkbox-label">{label}</LabelPrimitive.Root>
	{/if}
</span>
