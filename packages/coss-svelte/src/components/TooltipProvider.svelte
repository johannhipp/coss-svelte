<script>
import { Tooltip as TooltipPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<TooltipPrimitive.Provider {...rest}>
	<span data-slot="tooltip-provider" class={cn("cn-tooltip-provider", className)}>
		{@render children?.()}
	</span>
</TooltipPrimitive.Provider>
