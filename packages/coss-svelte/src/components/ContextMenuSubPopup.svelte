<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import { type ComponentProps, type Snippet, tick } from "svelte";
import {
	getContextMenuContext,
	getContextMenuSubContext,
} from "../internal/context-menu-context.svelte.js";
import { cn } from "../utils.js";

type PortalProps = Omit<ComponentProps<typeof ContextMenuPrimitive.Portal>, "children">;
type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.SubContent>, "child" | "children"> & {
	portalProps?: PortalProps;
	class?: string;
	children?: Snippet;
};
let {
	ref = $bindable(null),
	side,
	sideOffset = 0,
	align = "start",
	alignOffset,
	collisionPadding = 8,
	escapeKeydownBehavior = "close",
	onEscapeKeydown,
	portalProps = {},
	class: className = "",
	children,
	...rest
}: Props = $props();

const contextMenu = getContextMenuContext();
const sub = getContextMenuSubContext();
let resolvedSide = $derived(side ?? (contextMenu.dir === "rtl" ? "left" : "right"));
let resolvedAlignOffset = $derived(alignOffset ?? (align === "center" ? 0 : -5));

function handleEscapeKeydown(event: KeyboardEvent) {
	onEscapeKeydown?.(event);
	if (event.defaultPrevented) return;
	void tick().then(() => sub.trigger?.focus());
}
</script>

<ContextMenuPrimitive.Portal {...portalProps}>
	<ContextMenuPrimitive.SubContent
		{...rest}
		bind:ref
		data-slot="context-menu-sub-popup"
		class={cn("cn-menu-sub-popup cn-context-menu-sub-popup", className)}
		side={resolvedSide}
		{sideOffset}
		{align}
		alignOffset={resolvedAlignOffset}
		{collisionPadding}
		{escapeKeydownBehavior}
		onEscapeKeydown={handleEscapeKeydown}
	>
		{@render children?.()}
	</ContextMenuPrimitive.SubContent>
</ContextMenuPrimitive.Portal>
