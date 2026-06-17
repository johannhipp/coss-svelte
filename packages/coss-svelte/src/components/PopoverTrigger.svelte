<script>
import { Popover as PopoverPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<PopoverPrimitive.Trigger
	data-slot="popover-trigger"
	class={cn("cn-popover-trigger", className)}
	{...rest}
>
	{@render children?.()}
</PopoverPrimitive.Trigger>
