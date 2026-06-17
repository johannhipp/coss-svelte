<script>
import { Accordion as AccordionPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<AccordionPrimitive.Header
	data-slot="accordion-header"
	class={cn("cn-accordion-header", className)}
	{...rest}
>
	{@render children?.()}
</AccordionPrimitive.Header>
