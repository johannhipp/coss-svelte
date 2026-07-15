<script lang="ts">
import { Popover as PopoverPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<PopoverPrimitive.Trigger
	data-slot="popover-trigger"
	class={cn("cn-popover-trigger", className)}
	{...rest}
>
	{@render children?.()}
</PopoverPrimitive.Trigger>
