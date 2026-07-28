<script lang="ts">
import { Tooltip as TooltipPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof TooltipPrimitive.Provider>, "children"> & {
	class?: string;
	children?: Snippet;
};

let { class: className = "", children, ...rest }: Props = $props();
</script>

<TooltipPrimitive.Provider {...rest}>
	<span data-slot="tooltip-provider" class={cn("cn-tooltip-provider", className)}>
		{@render children?.()}
	</span>
</TooltipPrimitive.Provider>
