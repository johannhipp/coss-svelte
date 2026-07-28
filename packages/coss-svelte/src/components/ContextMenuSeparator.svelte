<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof ContextMenuPrimitive.Separator>;
let { class: className = "", children, ...rest }: Props = $props();
</script>

<ContextMenuPrimitive.Separator
	data-slot="context-menu-separator"
	class={cn("cn-menu-separator", className)}
	{...rest}
>
	{@render children?.()}
</ContextMenuPrimitive.Separator>
