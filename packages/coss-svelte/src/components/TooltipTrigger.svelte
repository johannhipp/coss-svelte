<script>
import { Tooltip as TooltipPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<TooltipPrimitive.Trigger
	data-slot="tooltip-trigger"
	class={cn("cn-tooltip-trigger", className)}
	{...rest}
>
	{@render children?.()}
</TooltipPrimitive.Trigger>
