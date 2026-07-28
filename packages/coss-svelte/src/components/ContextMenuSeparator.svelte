<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.Separator>, "child">;
let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<ContextMenuPrimitive.Separator
	{...rest}
	bind:ref
	data-slot="context-menu-separator"
	class={cn("cn-menu-separator", className)}
>
	{@render children?.()}
</ContextMenuPrimitive.Separator>
