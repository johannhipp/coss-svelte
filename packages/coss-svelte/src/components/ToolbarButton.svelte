<script lang="ts">
import { Toolbar as ToolbarPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof ToolbarPrimitive.Button>;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<ToolbarPrimitive.Button
	bind:ref
	data-slot="toolbar-button"
	class={cn("cn-toolbar-button", className)}
	{...rest}
>
	{@render children?.()}
</ToolbarPrimitive.Button>
