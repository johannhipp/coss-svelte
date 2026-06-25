<script>
import { Accordion as AccordionPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, forceMount = true, ...rest } = $props();
</script>

<AccordionPrimitive.Content
	data-slot="accordion-content"
	class={cn("cn-accordion-content", className)}
	{forceMount}
	{...rest}
>
	<div class="cn-accordion-content-inner">
		{@render children?.()}
	</div>
</AccordionPrimitive.Content>
