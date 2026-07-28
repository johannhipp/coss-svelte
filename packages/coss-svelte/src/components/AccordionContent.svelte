<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof AccordionPrimitive.Content>, "children" | "child"> & {
	class?: string;
	children?: Snippet;
	forceMount?: boolean;
};

let {
	ref = $bindable(null),
	class: className = "",
	children,
	forceMount = true,
	...rest
}: Props = $props();
</script>

<AccordionPrimitive.Content
	bind:ref
	data-slot="accordion-content"
	class={cn("cn-accordion-content", className)}
	{forceMount}
	{...rest}
>
	<div class="cn-accordion-content-inner">
		{@render children?.()}
	</div>
</AccordionPrimitive.Content>
