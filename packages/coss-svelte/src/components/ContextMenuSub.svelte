<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.Sub>, "children"> & {
	open?: boolean;
	class?: string;
	children?: Snippet;
};
let { open = $bindable(false), class: className = "", children, ...rest }: Props = $props();
</script>

<ContextMenuPrimitive.Sub bind:open {...rest}>
	<span data-slot="context-menu-sub" class={cn("cn-menu-sub-shell", className)}>
		{@render children?.()}
	</span>
</ContextMenuPrimitive.Sub>
