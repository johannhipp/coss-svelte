<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type AccordionItem = { value?: string; title: string; content: string; disabled?: boolean };
type RootProps = ComponentProps<typeof AccordionPrimitive.Root>;
type PrimitiveSingleProps = Extract<RootProps, { type: "single" }>;
type PrimitiveMultipleProps = Extract<RootProps, { type: "multiple" }>;
type ConvenienceProps = {
	items?: AccordionItem[];
	class?: string;
	children?: Snippet;
};
type SingleProps = Omit<
	PrimitiveSingleProps,
	"child" | "children" | "onValueChange" | "type" | "value"
> &
	ConvenienceProps & {
		type?: "single";
		value?: string;
		onValueChange?: PrimitiveSingleProps["onValueChange"];
	};
type MultipleProps = Omit<
	PrimitiveMultipleProps,
	"child" | "children" | "onValueChange" | "type" | "value"
> &
	ConvenienceProps & {
		type: "multiple";
		value?: string[];
		onValueChange?: PrimitiveMultipleProps["onValueChange"];
	};
type Props = SingleProps | MultipleProps;

let { ref = $bindable(null), value = $bindable(), ...props }: Props = $props();

function singleValue(value: Props["value"]): string | undefined {
	if (value === undefined || typeof value === "string") return value;
	throw new TypeError('Accordion type="single" requires a string value.');
}

function multipleValue(value: Props["value"]): string[] | undefined {
	if (value === undefined || Array.isArray(value)) return value;
	throw new TypeError('Accordion type="multiple" requires a string[] value.');
}

function singleRootProps(props: Omit<SingleProps, "value">) {
	const {
		items: _items,
		class: _class,
		children: _children,
		type: _type,
		onValueChange: _onValueChange,
		...rootProps
	} = props;
	return rootProps;
}

function multipleRootProps(props: Omit<MultipleProps, "value">) {
	const {
		items: _items,
		class: _class,
		children: _children,
		type: _type,
		onValueChange: _onValueChange,
		...rootProps
	} = props;
	return rootProps;
}
</script>

{#snippet content()}
	{#if props.children}
		{@render props.children()}
	{:else if props.items?.length}
		{#each props.items as item, index}
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
	{/if}
{/snippet}

{#if props.type === "multiple"}
	<AccordionPrimitive.Root
		bind:ref
		{...multipleRootProps(props)}
		data-slot="accordion"
		class={cn("cn-accordion", props.class)}
		type="multiple"
		value={multipleValue(value)}
		onValueChange={(next) => {
			value = next;
			props.onValueChange?.(next);
		}}
	>
		{@render content()}
	</AccordionPrimitive.Root>
{:else}
	<AccordionPrimitive.Root
		bind:ref
		{...singleRootProps(props)}
		data-slot="accordion"
		class={cn("cn-accordion", props.class)}
		type="single"
		value={singleValue(value)}
		onValueChange={(next) => {
			value = next;
			props.onValueChange?.(next);
		}}
	>
		{@render content()}
	</AccordionPrimitive.Root>
{/if}
