<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";

type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.Root>, "children"> & {
	open?: boolean;
	children?: Snippet;
};

let { open = $bindable(false), children, ...rest }: Props = $props();
</script>

<ContextMenuPrimitive.Root bind:open {...rest}>
	{@render children?.()}
</ContextMenuPrimitive.Root>
