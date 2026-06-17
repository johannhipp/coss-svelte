<script>
import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { orientation = "vertical", class: className = "", children, ...rest } = $props();
</script>

<ScrollAreaPrimitive.Scrollbar
	data-slot="scroll-area-scrollbar"
	class={cn("cn-scroll-area-scrollbar", className)}
	{orientation}
	{...rest}
>
	{@render children?.()}
</ScrollAreaPrimitive.Scrollbar>
