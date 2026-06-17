<script>
import { Popover as PopoverPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	open = $bindable(false),
	label = "Popover",
	class: className = "",
	children: rootChildren,
	...rest
} = $props();
</script>

<PopoverPrimitive.Root bind:open {...rest}>
	{#if rootChildren}
		{@render rootChildren()}
	{:else}
		<PopoverPrimitive.Trigger data-slot="popover-trigger" class="cn-popover-trigger">
			{label}
		</PopoverPrimitive.Trigger>
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content data-slot="popover-popup" class={cn("cn-popover-content", className)}>
				{label}
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Portal>
	{/if}
</PopoverPrimitive.Root>
