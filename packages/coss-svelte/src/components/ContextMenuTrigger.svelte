<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.Trigger>, "children"> & {
	class?: string;
	children?: Snippet;
};

let { class: className = "", children, ...rest }: Props = $props();

function handleKeydown(event: KeyboardEvent & { currentTarget: HTMLDivElement }) {
	rest.onkeydown?.(event);
	if (
		event.defaultPrevented ||
		rest.disabled ||
		!((event.key === "F10" && event.shiftKey) || event.key === "ContextMenu")
	) {
		return;
	}

	const target = event.target instanceof HTMLElement ? event.target : event.currentTarget;
	const bounds = target.getBoundingClientRect();
	const contextMenuEvent = new MouseEvent("contextmenu", {
		bubbles: true,
		cancelable: true,
		button: 2,
		clientX: bounds.left + bounds.width / 2,
		clientY: bounds.top + bounds.height / 2,
	});
	const handled = !target.dispatchEvent(contextMenuEvent);
	if (handled) event.preventDefault();
}
</script>

<ContextMenuPrimitive.Trigger
	{...rest}
	data-slot="context-menu-trigger"
	class={cn("cn-context-menu-trigger", className)}
	onkeydown={handleKeydown}
>
	{@render children?.()}
</ContextMenuPrimitive.Trigger>
