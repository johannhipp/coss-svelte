<script>
import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ScrollAreaPrimitive.Viewport
	data-slot="scroll-area-viewport"
	class={cn("cn-scroll-area-viewport", className)}
	{...rest}
>
	{@render children?.()}
</ScrollAreaPrimitive.Viewport>
