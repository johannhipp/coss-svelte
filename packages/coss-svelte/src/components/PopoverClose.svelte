<script>
import { Popover as PopoverPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<PopoverPrimitive.Close
	data-slot="popover-close"
	class={cn("cn-popover-close", className)}
	{...rest}
>
	{@render children?.()}
</PopoverPrimitive.Close>
