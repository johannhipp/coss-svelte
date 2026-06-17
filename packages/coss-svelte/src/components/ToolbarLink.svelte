<script>
import { Toolbar as ToolbarPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ToolbarPrimitive.Link
	data-slot="toolbar-link"
	class={cn("cn-toolbar-link", className)}
	{...rest}
>
	{@render children?.()}
</ToolbarPrimitive.Link>
