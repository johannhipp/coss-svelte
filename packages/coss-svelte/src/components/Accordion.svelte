<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import type { PrimitiveAttributes } from "../internal/props.js";
import { cn } from "../utils.js";

type AccordionItem = { value?: string; title: string; content: string; disabled?: boolean };
type Props = PrimitiveAttributes & {
	type?: "single" | "multiple";
	value?: string | string[];
	items?: AccordionItem[];
	class?: string;
	children?: Snippet;
	onValueChange?: (value: string | string[]) => void;
};

let {
	type = "single",
	value = $bindable(),
	items = [],
	class: className = "",
	children,
	onValueChange,
	...rest
}: Props = $props();
</script>

{#snippet content()}
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
				<AccordionPrimitive.Content
					data-slot="accordion-content"
					class="cn-accordion-content"
					forceMount
				>
					<div class="cn-accordion-content-inner">
						{item.content}
					</div>
				</AccordionPrimitive.Content>
			</AccordionPrimitive.Item>
		{/each}
	{:else}
		{@render children?.()}
	{/if}
{/snippet}

{#if type === "multiple"}
	<AccordionPrimitive.Root
		data-slot="accordion"
		class={cn("cn-accordion", className)}
		type="multiple"
		value={Array.isArray(value) ? value : []}
		onValueChange={(next) => {
			value = next;
			onValueChange?.(next);
		}}
		{...rest}
	>
		{@render content()}
	</AccordionPrimitive.Root>
{:else}
	<AccordionPrimitive.Root
		data-slot="accordion"
		class={cn("cn-accordion", className)}
		type="single"
		value={typeof value === "string" ? value : ""}
		onValueChange={(next) => {
			value = next;
			onValueChange?.(next);
		}}
		{...rest}
	>
		{@render content()}
	</AccordionPrimitive.Root>
{/if}
