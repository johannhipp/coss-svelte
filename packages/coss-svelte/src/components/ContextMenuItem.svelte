<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type ContextMenuItemVariant = "default" | "destructive";
type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.Item>, "children"> & {
	inset?: boolean;
	variant?: ContextMenuItemVariant;
	class?: string;
	children?: Snippet;
};

let {
	inset = false,
	variant = "default",
	class: className = "",
	children,
	...rest
}: Props = $props();
</script>

<ContextMenuPrimitive.Item
	data-slot="context-menu-item"
	data-inset={inset ? "" : undefined}
	data-variant={variant}
	class={cn("cn-menu-item", className)}
	{...rest}
>
	{@render children?.()}
</ContextMenuPrimitive.Item>
