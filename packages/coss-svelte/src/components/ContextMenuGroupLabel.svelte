<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof ContextMenuPrimitive.GroupHeading> & {
	inset?: boolean;
};
let { inset = false, class: className = "", children, ...rest }: Props = $props();
</script>

<ContextMenuPrimitive.GroupHeading
	data-slot="context-menu-group-label"
	data-inset={inset ? "" : undefined}
	class={cn("cn-menu-group-label", className)}
	{...rest}
>
	{@render children?.()}
</ContextMenuPrimitive.GroupHeading>
