<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<AccordionPrimitive.Header
	data-slot="accordion-header"
	class={cn("cn-accordion-header", className)}
	{...rest}
>
	{@render children?.()}
</AccordionPrimitive.Header>
