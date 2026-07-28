<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { setContextMenuContext } from "../internal/context-menu-context.svelte.js";

type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.Root>, "children"> & {
	open?: boolean;
	children?: Snippet;
};

let { open = $bindable(false), dir = "ltr", children, ...rest }: Props = $props();

let trigger = $state<HTMLElement | null>(null);

setContextMenuContext(
	() => dir,
	() => trigger,
	(nextTrigger) => {
		trigger = nextTrigger;
	}
);
</script>

<ContextMenuPrimitive.Root bind:open {dir} {...rest}>
	{@render children?.()}
</ContextMenuPrimitive.Root>
