<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.GroupHeading>, "child"> & {
	inset?: boolean;
};
let {
	ref = $bindable(null),
	inset = false,
	class: className = "",
	children,
	...rest
}: Props = $props();
</script>

<ContextMenuPrimitive.GroupHeading
	{...rest}
	bind:ref
	data-slot="context-menu-group-label"
	data-inset={inset ? "" : undefined}
	class={cn("cn-menu-group-label", className)}
>
	{@render children?.()}
</ContextMenuPrimitive.GroupHeading>
