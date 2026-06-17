<script>
import { Accordion as AccordionPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<AccordionPrimitive.Trigger
	data-slot="accordion-trigger"
	class={cn("cn-accordion-trigger", className)}
	{...rest}
>
	{@render children?.()}
	<span data-slot="accordion-indicator" class="cn-accordion-indicator">
		<svg
			aria-hidden="true"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	</span>
</AccordionPrimitive.Trigger>
