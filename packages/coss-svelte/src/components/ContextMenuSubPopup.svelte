<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type PortalProps = Omit<ComponentProps<typeof ContextMenuPrimitive.Portal>, "children">;
type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.SubContent>, "child" | "children"> & {
	portalProps?: PortalProps;
	class?: string;
	children?: Snippet;
};
let {
	side = "right",
	sideOffset = 0,
	align = "start",
	alignOffset = -5,
	collisionPadding = 8,
	portalProps = {},
	class: className = "",
	children,
	...rest
}: Props = $props();
</script>

<ContextMenuPrimitive.Portal {...portalProps}>
	<ContextMenuPrimitive.SubContent
		data-slot="context-menu-sub-popup"
		class={cn("cn-menu-sub-popup cn-context-menu-sub-popup", className)}
		{side}
		{sideOffset}
		{align}
		{alignOffset}
		{collisionPadding}
		{...rest}
	>
		{@render children?.()}
	</ContextMenuPrimitive.SubContent>
</ContextMenuPrimitive.Portal>
