<script>
import { Toolbar as ToolbarPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ToolbarPrimitive.Button
	data-slot="toolbar-button"
	class={cn("cn-toolbar-button", className)}
	{...rest}
>
	{@render children?.()}
</ToolbarPrimitive.Button>
