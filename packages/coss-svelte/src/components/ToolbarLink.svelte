<script lang="ts">
import { Toolbar as ToolbarPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof ToolbarPrimitive.Link>;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<ToolbarPrimitive.Link
	bind:ref
	data-slot="toolbar-link"
	class={cn("cn-toolbar-link", className)}
	{...rest}
>
	{@render children?.()}
</ToolbarPrimitive.Link>
