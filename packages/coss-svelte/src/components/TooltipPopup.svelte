<script>
import { Tooltip as TooltipPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<TooltipPrimitive.Content
	data-slot="tooltip-popup"
	class={cn("cn-tooltip-content", className)}
	{...rest}
>
	{@render children?.()}
</TooltipPrimitive.Content>
