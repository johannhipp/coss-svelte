<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof AccordionPrimitive.Item>;

let { class: className = "", children, ...rest }: Props = $props();
</script>

<AccordionPrimitive.Item
	data-slot="accordion-item"
	class={cn("cn-accordion-item", className)}
	{...rest}
>
	{@render children?.()}
</AccordionPrimitive.Item>
