<script>
import { Accordion as AccordionPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<AccordionPrimitive.Item
	data-slot="accordion-item"
	class={cn("cn-accordion-item", className)}
	{...rest}
>
	{@render children?.()}
</AccordionPrimitive.Item>
