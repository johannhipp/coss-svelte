<script lang="ts">
import { getFieldContext } from "../internal/field-context.svelte.js";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let {
	required,
	for: htmlFor,
	class: className = "",
	children,
	...rest
}: NativeProps & {
	required?: boolean;
	for?: string;
} = $props();
const field = getFieldContext();
</script>

<label data-slot="field-label" id={field?.labelId} for={htmlFor ?? field?.controlId} class={cn("cn-field-label", className)} {...rest}>
	<span>{@render children?.()}</span>
	{#if required ?? field?.required}
		<span class="cn-field-required" aria-hidden="true">*</span>
	{/if}
</label>
