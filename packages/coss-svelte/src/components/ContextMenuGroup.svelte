<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.Group>, "child">;
let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<ContextMenuPrimitive.Group
	{...rest}
	bind:ref
	data-slot="context-menu-group"
	class={cn("cn-menu-group", className)}
>
	{@render children?.()}
</ContextMenuPrimitive.Group>
