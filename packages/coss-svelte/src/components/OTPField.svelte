<script>
import { PinInput as PinInputPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	value = $bindable(""),
	length = 6,
	class: className = "",
	children: rootChildren,
	...rest
} = $props();
</script>

<PinInputPrimitive.Root
	data-slot="otp-field"
	class={cn("cn-otp-field", className)}
	bind:value
	maxlength={length}
	{...rest}
>
	{#snippet children({ cells })}
		{#if rootChildren}
			{@render rootChildren({ cells })}
		{:else}
			{#each cells as cell}
				<PinInputPrimitive.Cell data-slot="otp-field-cell" class="cn-otp-cell" {cell}>
					{cell.char ?? ""}
				</PinInputPrimitive.Cell>
			{/each}
		{/if}
	{/snippet}
</PinInputPrimitive.Root>
