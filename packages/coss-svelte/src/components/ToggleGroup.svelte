<script lang="ts">
import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type ToggleItem = string | { value?: string; label?: string; disabled?: boolean };
type RootProps = ComponentProps<typeof ToggleGroupPrimitive.Root>;
type PrimitiveSingleProps = Extract<RootProps, { type: "single" }>;
type PrimitiveMultipleProps = Extract<RootProps, { type: "multiple" }>;
type ConvenienceProps = {
	items?: ToggleItem[];
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
	throw new TypeError('ToggleGroup type="single" requires a string value.');
}

function multipleValue(value: Props["value"]): string[] | undefined {
	if (value === undefined || Array.isArray(value)) return value;
	throw new TypeError('ToggleGroup type="multiple" requires a string[] value.');
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
			{@const normalized = typeof item === "string" ? { value: item, label: item, disabled: false } : { value: item.value ?? `item-${index + 1}`, label: item.label ?? item.value ?? `Item ${index + 1}`, disabled: item.disabled ?? false }}
			<ToggleGroupPrimitive.Item
				data-slot="toggle-group-item"
				class="cn-toggle-group-item"
				value={normalized.value}
				disabled={normalized.disabled}
			>
				{normalized.label}
			</ToggleGroupPrimitive.Item>
		{/each}
	{/if}
{/snippet}

{#if props.type === "multiple"}
	<ToggleGroupPrimitive.Root
		bind:ref
		{...multipleRootProps(props)}
		data-slot="toggle-group"
		class={cn("cn-toggle-group", props.class)}
		type="multiple"
		value={multipleValue(value)}
		onValueChange={(next) => {
			value = next;
			props.onValueChange?.(next);
		}}
	>
		{@render content()}
	</ToggleGroupPrimitive.Root>
{:else}
	<ToggleGroupPrimitive.Root
		bind:ref
		{...singleRootProps(props)}
		data-slot="toggle-group"
		class={cn("cn-toggle-group", props.class)}
		type="single"
		value={singleValue(value)}
		onValueChange={(next) => {
			value = next;
			props.onValueChange?.(next);
		}}
	>
		{@render content()}
	</ToggleGroupPrimitive.Root>
{/if}
