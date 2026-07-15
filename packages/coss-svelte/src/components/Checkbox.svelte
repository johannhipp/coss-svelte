<script lang="ts">
import { Checkbox as CheckboxPrimitive, Label as LabelPrimitive, useId } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof CheckboxPrimitive.Root>, "children" | "child"> & {
	id?: string;
	label?: string;
	class?: string;
};

let {
	id = useId(),
	checked = $bindable(false),
	indeterminate = $bindable(false),
	label = "",
	class: className = "",
	...rest
}: Props = $props();
</script>

<span data-slot="checkbox-field" class="cn-checkbox-field">
	<CheckboxPrimitive.Root
		{id}
		data-slot="checkbox"
		class={cn("cn-checkbox", className)}
		bind:checked
		bind:indeterminate
		{...rest}
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
		<LabelPrimitive.Root for={id} class="cn-checkbox-label">{label}</LabelPrimitive.Root>
	{/if}
</span>
