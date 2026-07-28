<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof AccordionPrimitive.Header>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<AccordionPrimitive.Header
	bind:ref
	data-slot="accordion-header"
	class={cn("cn-accordion-header", className)}
	{...rest}
>
	{@render children?.()}
</AccordionPrimitive.Header>
