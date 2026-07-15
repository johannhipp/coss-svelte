<script lang="ts">
import { Tooltip as TooltipPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<TooltipPrimitive.Provider {...rest}>
	<span data-slot="tooltip-provider" class={cn("cn-tooltip-provider", className)}>
		{@render children?.()}
	</span>
</TooltipPrimitive.Provider>
