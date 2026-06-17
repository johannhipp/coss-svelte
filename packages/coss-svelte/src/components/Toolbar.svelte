<script>
import { Toolbar as ToolbarPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { orientation = "horizontal", class: className = "", children, ...rest } = $props();
</script>

<ToolbarPrimitive.Root
	data-slot="toolbar"
	class={cn("cn-toolbar", className)}
	{orientation}
	{...rest}
>
	{@render children?.()}
</ToolbarPrimitive.Root>
