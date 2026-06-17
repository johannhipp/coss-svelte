<script>
import { Accordion as AccordionPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<AccordionPrimitive.Content
	data-slot="accordion-content"
	class={cn("cn-accordion-content", className)}
	{...rest}
>
	{@render children?.()}
</AccordionPrimitive.Content>
