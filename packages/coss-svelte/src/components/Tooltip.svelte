<script lang="ts">
import { Tooltip as TooltipPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof TooltipPrimitive.Root>, "children" | "child"> & {
	label?: string;
	tip?: string;
	class?: string;
	children?: Snippet;
};

let {
	label = "Hover",
	tip = "Tooltip",
	class: className = "",
	children,
	...rest
}: Props = $props();
</script>

{#if children}
	<TooltipPrimitive.Root {...rest}>
		{@render children()}
	</TooltipPrimitive.Root>
{:else}
	<TooltipPrimitive.Provider>
		<TooltipPrimitive.Root {...rest}>
			<TooltipPrimitive.Trigger data-slot="tooltip-trigger" class="cn-tooltip-trigger">
				{label}
			</TooltipPrimitive.Trigger>
			<TooltipPrimitive.Portal>
				<TooltipPrimitive.Content
					data-slot="tooltip-popup"
					class={cn("cn-tooltip-content", className)}
				>
					{tip}
				</TooltipPrimitive.Content>
			</TooltipPrimitive.Portal>
		</TooltipPrimitive.Root>
	</TooltipPrimitive.Provider>
{/if}
