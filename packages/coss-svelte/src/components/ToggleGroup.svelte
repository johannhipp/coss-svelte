<script lang="ts">
import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import type { PrimitiveAttributes } from "../internal/props.js";
import { cn } from "../utils.js";

type ToggleItem = string | { value?: string; label?: string; disabled?: boolean };
type Props = PrimitiveAttributes & {
	type?: "single" | "multiple";
	value?: string | string[];
	items?: ToggleItem[];
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
	{:else}
		{@render children?.()}
	{/if}
{/snippet}

{#if type === "multiple"}
	<ToggleGroupPrimitive.Root
		data-slot="toggle-group"
		class={cn("cn-toggle-group", className)}
		type="multiple"
		value={Array.isArray(value) ? value : []}
		onValueChange={(next) => {
			value = next;
			onValueChange?.(next);
		}}
		{...rest}
	>
		{@render content()}
	</ToggleGroupPrimitive.Root>
{:else}
	<ToggleGroupPrimitive.Root
		data-slot="toggle-group"
		class={cn("cn-toggle-group", className)}
		type="single"
		value={typeof value === "string" ? value : ""}
		onValueChange={(next) => {
			value = next;
			onValueChange?.(next);
		}}
		{...rest}
	>
		{@render content()}
	</ToggleGroupPrimitive.Root>
{/if}
