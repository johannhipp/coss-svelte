<script lang="ts">
import { Toolbar as ToolbarPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ToolbarPrimitive.GroupItem>, "children" | "child"> & {
	children?: Snippet;
};
let { value, class: className = "", children, ...rest }: Props = $props();
</script>

<ToolbarPrimitive.GroupItem
	data-slot="toolbar-group-item"
	class={cn("cn-toolbar-group-item", className)}
	{value}
	{...rest}
>
	{@render children?.()}
</ToolbarPrimitive.GroupItem>
