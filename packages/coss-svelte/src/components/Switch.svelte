<script lang="ts">
import { Label as LabelPrimitive, Switch as SwitchPrimitive, useId } from "bits-ui";
import type { ComponentProps } from "svelte";
import { getFieldContext, mergeFieldIds } from "../internal/field-context.svelte.js";
import { cn } from "../utils.js";

type RootProps = ComponentProps<typeof SwitchPrimitive.Root>;
type Props = Omit<RootProps, "child" | "value"> & {
	value?: string;
	label?: string;
};

let {
	ref = $bindable(null),
	id,
	checked = $bindable(false),
	label = "",
	disabled,
	required,
	class: className = "",
	children: rootChildren,
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

<span data-slot="switch-field" class="cn-switch-field">
	<SwitchPrimitive.Root
	bind:ref
		{...rest}
		id={resolvedId}
		data-slot="switch"
		class={cn("cn-switch", className)}
		bind:checked
		disabled={resolvedDisabled}
		required={resolvedRequired}
		aria-describedby={describedBy}
		aria-invalid={resolvedInvalid}
	>
		{#snippet children(snippetProps)}
			{#if rootChildren}
				{@render rootChildren(snippetProps)}
			{:else}
				<SwitchPrimitive.Thumb data-slot="switch-thumb" class="cn-switch-thumb" />
			{/if}
		{/snippet}
	</SwitchPrimitive.Root>
	{#if label}
		<LabelPrimitive.Root for={resolvedId} class="cn-switch-label">{label}</LabelPrimitive.Root>
	{/if}
</span>
