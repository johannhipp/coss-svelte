<script>
import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ScrollAreaPrimitive.Root data-slot="scroll-area" class={cn("cn-scroll-area", className)} {...rest}>
	{@render children?.()}
</ScrollAreaPrimitive.Root>
