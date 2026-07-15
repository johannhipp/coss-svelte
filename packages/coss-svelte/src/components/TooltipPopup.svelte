<script lang="ts">
import { Tooltip as TooltipPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof TooltipPrimitive.Content>, "children" | "child"> & {
	class?: string;
	children?: Snippet;
};

let { class: className = "", children, ...rest }: Props = $props();
</script>

<TooltipPrimitive.Content
	data-slot="tooltip-popup"
	class={cn("cn-tooltip-content", className)}
	{...rest}
>
	{@render children?.()}
</TooltipPrimitive.Content>
