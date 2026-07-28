<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import { type ComponentProps, type Snippet, tick } from "svelte";
import { getContextMenuContext } from "../internal/context-menu-context.svelte.js";
import { cn } from "../utils.js";

type PortalProps = Omit<ComponentProps<typeof ContextMenuPrimitive.Portal>, "children">;
type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.Content>, "child" | "children"> & {
	portalProps?: PortalProps;
	class?: string;
	children?: Snippet;
};

let {
	ref = $bindable(null),
	side = "bottom",
	sideOffset = 4,
	align = "center",
	collisionPadding = 8,
	escapeKeydownBehavior = "defer-otherwise-close",
	onEscapeKeydown,
	onCloseAutoFocus,
	portalProps = {},
	class: className = "",
	children,
	...rest
}: Props = $props();

const contextMenu = getContextMenuContext();
let restoreFocusAfterClose = false;

function handleEscapeKeydown(event: KeyboardEvent) {
	onEscapeKeydown?.(event);
	if (!event.defaultPrevented) restoreFocusAfterClose = true;
}

function handleCloseAutoFocus(event: Event) {
	onCloseAutoFocus?.(event);
	const shouldRestoreFocus = restoreFocusAfterClose && !event.defaultPrevented;
	restoreFocusAfterClose = false;
	if (!shouldRestoreFocus) return;
	void tick().then(() => contextMenu.trigger?.focus());
}
</script>

<ContextMenuPrimitive.Portal {...portalProps}>
	<ContextMenuPrimitive.Content
		{...rest}
		bind:ref
		data-slot="context-menu-popup"
		class={cn("cn-menu-popup cn-context-menu-popup", className)}
		{side}
		{sideOffset}
		{align}
		{collisionPadding}
		{escapeKeydownBehavior}
		onEscapeKeydown={handleEscapeKeydown}
		onCloseAutoFocus={handleCloseAutoFocus}
	>
		{@render children?.()}
	</ContextMenuPrimitive.Content>
</ContextMenuPrimitive.Portal>
