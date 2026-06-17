<script>
import { Accordion as AccordionPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	type = "single",
	value = $bindable(),
	items = [],
	class: className = "",
	children,
	...rest
} = $props();
</script>

<AccordionPrimitive.Root
	data-slot="accordion"
	class={cn("cn-accordion", className)}
	{type}
	bind:value
	{...rest}
>
	{#if items.length}
		{#each items as item, index}
			<AccordionPrimitive.Item
				data-slot="accordion-item"
				class="cn-accordion-item"
				value={item.value ?? `item-${index + 1}`}
				disabled={item.disabled}
			>
					<AccordionPrimitive.Header data-slot="accordion-header" class="cn-accordion-header">
						<AccordionPrimitive.Trigger data-slot="accordion-trigger" class="cn-accordion-trigger">
							<span>{item.title}</span>
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
					</AccordionPrimitive.Header>
				<AccordionPrimitive.Content data-slot="accordion-content" class="cn-accordion-content">
					{item.content}
				</AccordionPrimitive.Content>
			</AccordionPrimitive.Item>
		{/each}
	{:else}
		{@render children?.()}
	{/if}
</AccordionPrimitive.Root>
