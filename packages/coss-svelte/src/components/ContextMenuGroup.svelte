<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof ContextMenuPrimitive.Group>;
let { class: className = "", children, ...rest }: Props = $props();
</script>

<ContextMenuPrimitive.Group
	data-slot="context-menu-group"
	class={cn("cn-menu-group", className)}
	{...rest}
>
	{@render children?.()}
</ContextMenuPrimitive.Group>
