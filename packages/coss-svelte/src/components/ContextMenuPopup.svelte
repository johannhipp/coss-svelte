<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type PortalProps = Omit<ComponentProps<typeof ContextMenuPrimitive.Portal>, "children">;
type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.Content>, "child" | "children"> & {
	portalProps?: PortalProps;
	class?: string;
	children?: Snippet;
};

let {
	collisionPadding = 8,
	portalProps = {},
	class: className = "",
	children,
	...rest
}: Props = $props();
</script>

<ContextMenuPrimitive.Portal {...portalProps}>
	<ContextMenuPrimitive.Content
		data-slot="context-menu-popup"
		class={cn("cn-menu-popup cn-context-menu-popup", className)}
		{collisionPadding}
		{...rest}
	>
		{@render children?.()}
	</ContextMenuPrimitive.Content>
</ContextMenuPrimitive.Portal>
