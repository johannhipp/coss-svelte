<script>
import { Tooltip as TooltipPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { label = "Hover", tip = "Tooltip", class: className = "", children, ...rest } = $props();
</script>

<TooltipPrimitive.Root {...rest}>
	{#if children}
		{@render children()}
	{:else}
		<TooltipPrimitive.Trigger data-slot="tooltip-trigger" class="cn-tooltip-trigger">
			{label}
		</TooltipPrimitive.Trigger>
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Content data-slot="tooltip-popup" class={cn("cn-tooltip-content", className)}>
				{tip}
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Portal>
	{/if}
</TooltipPrimitive.Root>
