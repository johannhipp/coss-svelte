<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { getContextMenuContext } from "../internal/context-menu-context.svelte.js";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.Trigger>, "children"> & {
	class?: string;
	children?: Snippet;
};

let {
	ref = $bindable(null),
	disabled = false,
	class: className = "",
	children,
	onkeydown,
	...rest
}: Props = $props();

const contextMenu = getContextMenuContext();

$effect(() => {
	const trigger = ref;
	contextMenu.setTrigger(trigger);
	return () => {
		if (contextMenu.trigger === trigger) contextMenu.setTrigger(null);
	};
});

function handleKeydown(event: KeyboardEvent & { currentTarget: HTMLDivElement }) {
	onkeydown?.(event);
	if (
		event.defaultPrevented ||
		disabled ||
		!((event.key === "F10" && event.shiftKey) || event.key === "ContextMenu")
	) {
		return;
	}

	const target = event.currentTarget;
	const view = target.ownerDocument.defaultView;
	if (!view) return;
	const bounds = target.getBoundingClientRect();
	event.preventDefault();
	const init: MouseEventInit = {
		bubbles: true,
		cancelable: true,
		composed: true,
		button: 2,
		clientX: bounds.left + bounds.width / 2,
		clientY: bounds.top + bounds.height / 2,
		view,
	};
	let contextMenuEvent: MouseEvent;
	try {
		contextMenuEvent = new view.MouseEvent("contextmenu", init);
	} catch {
		// JSDOM rejects its own WindowProxy as UIEvent.view; browsers use the exact init above.
		const { view: _view, ...compatibleInit } = init;
		contextMenuEvent = new view.MouseEvent("contextmenu", compatibleInit);
	}
	target.dispatchEvent(contextMenuEvent);
}
</script>

<ContextMenuPrimitive.Trigger
	bind:ref
	{...rest}
	{disabled}
	data-slot="context-menu-trigger"
	class={cn("cn-context-menu-trigger", className)}
	onkeydown={handleKeydown}
>
	{@render children?.()}
</ContextMenuPrimitive.Trigger>
