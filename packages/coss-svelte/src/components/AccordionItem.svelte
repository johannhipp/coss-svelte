<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof AccordionPrimitive.Item>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<AccordionPrimitive.Item
	bind:ref
	data-slot="accordion-item"
	class={cn("cn-accordion-item", className)}
	{...rest}
>
	{@render children?.()}
</AccordionPrimitive.Item>
