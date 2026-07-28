<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { setContextMenuSubContext } from "../internal/context-menu-context.svelte.js";

type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.Sub>, "children"> & {
	open?: boolean;
	children?: Snippet;
};
let { open = $bindable(false), children, ...rest }: Props = $props();
let trigger = $state<HTMLElement | null>(null);

setContextMenuSubContext(
	() => trigger,
	(nextTrigger) => {
		trigger = nextTrigger;
	}
);
</script>

<ContextMenuPrimitive.Sub bind:open {...rest}>
	{@render children?.()}
</ContextMenuPrimitive.Sub>
