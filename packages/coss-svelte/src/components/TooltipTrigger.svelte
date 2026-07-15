<script lang="ts">
import { Tooltip as TooltipPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<TooltipPrimitive.Trigger
	data-slot="tooltip-trigger"
	class={cn("cn-tooltip-trigger", className)}
	{...rest}
>
	{@render children?.()}
</TooltipPrimitive.Trigger>
