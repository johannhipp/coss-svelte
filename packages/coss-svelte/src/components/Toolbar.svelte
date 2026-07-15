<script lang="ts">
import { Toolbar as ToolbarPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof ToolbarPrimitive.Root>;
let { orientation = "horizontal", class: className = "", children, ...rest }: Props = $props();
</script>

<ToolbarPrimitive.Root
	data-slot="toolbar"
	class={cn("cn-toolbar", className)}
	{orientation}
	{...rest}
>
	{@render children?.()}
</ToolbarPrimitive.Root>
