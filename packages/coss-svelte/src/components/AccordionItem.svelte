<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<AccordionPrimitive.Item
	data-slot="accordion-item"
	class={cn("cn-accordion-item", className)}
	{...rest}
>
	{@render children?.()}
</AccordionPrimitive.Item>
