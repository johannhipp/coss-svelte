<script>
import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
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

<ToggleGroupPrimitive.Root
	data-slot="toggle-group"
	class={cn("cn-toggle-group", className)}
	{type}
	bind:value
	{...rest}
>
	{#if items.length}
		{#each items as item, index}
			<ToggleGroupPrimitive.Item
				data-slot="toggle-group-item"
				class="cn-toggle-group-item"
				value={item.value ?? `item-${index + 1}`}
				disabled={item.disabled}
			>
				{item.label ?? item}
			</ToggleGroupPrimitive.Item>
		{/each}
	{:else}
		{@render children?.()}
	{/if}
</ToggleGroupPrimitive.Root>
