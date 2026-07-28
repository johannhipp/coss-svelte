<script lang="ts">
import { onDestroy } from "svelte";
import { getFieldContext } from "../internal/field-context.svelte.js";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let {
	required,
	for: htmlFor,
	id,
	class: className = "",
	children,
	...rest
}: NativeProps & {
	required?: boolean;
	for?: string;
} = $props();
const field = getFieldContext();
let labelId = $derived(id ?? field?.labelId);
// svelte-ignore state_referenced_locally
const unregisterLabel = field?.registerLabel(labelId);
onDestroy(() => unregisterLabel?.());
</script>

<label data-slot="field-label" id={labelId} for={htmlFor ?? field?.controlId} class={cn("cn-field-label", className)} {...rest}>
	<span>{@render children?.()}</span>
	{#if required ?? field?.required}
		<span class="cn-field-required" aria-hidden="true">*</span>
	{/if}
</label>
