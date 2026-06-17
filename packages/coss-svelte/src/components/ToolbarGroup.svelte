<script>
import { Toolbar as ToolbarPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { type = "single", value = $bindable(), class: className = "", children, ...rest } = $props();
</script>

<ToolbarPrimitive.Group
	data-slot="toolbar-group"
	class={cn("cn-toolbar-group", className)}
	{type}
	bind:value
	{...rest}
>
	{@render children?.()}
</ToolbarPrimitive.Group>
