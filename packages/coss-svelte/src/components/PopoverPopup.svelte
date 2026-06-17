<script>
import { Popover as PopoverPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<PopoverPrimitive.Portal>
	<PopoverPrimitive.Content data-slot="popover-popup" class={cn("cn-popover-content", className)} {...rest}>
		{@render children?.()}
	</PopoverPrimitive.Content>
</PopoverPrimitive.Portal>
