<script>
import { Select as SelectPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children: valueChildren, ...rest } = $props();
</script>

{#if valueChildren}
	<SelectPrimitive.Value
		data-slot="select-value"
		class={cn("cn-select-value", className)}
		{...rest}
	>
		{#snippet children(props)}
			{@render valueChildren?.(props)}
		{/snippet}
	</SelectPrimitive.Value>
{:else}
	<SelectPrimitive.Value
		data-slot="select-value"
		class={cn("cn-select-value", className)}
		{...rest}
	/>
{/if}
