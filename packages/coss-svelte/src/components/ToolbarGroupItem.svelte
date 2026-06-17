<script>
import { Toolbar as ToolbarPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ToolbarPrimitive.GroupItem
	data-slot="toolbar-group-item"
	class={cn("cn-toolbar-group-item", className)}
	{...rest}
>
	{@render children?.()}
</ToolbarPrimitive.GroupItem>
