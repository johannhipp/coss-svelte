<script>
import { Tabs as TabsPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	children,
	value = $bindable("tab-1"),
	tabs = children ? [] : ["Overview", "Details"],
	class: className = "",
	...rest
} = $props();
</script>

<TabsPrimitive.Root data-slot="tabs" class={cn("cn-tabs", className)} bind:value {...rest}>
	{#if tabs.length}
		<TabsPrimitive.List data-slot="tabs-list" class="cn-tabs-list">
		{#each tabs as tab, index}
			<TabsPrimitive.Trigger
				data-slot="tabs-trigger"
				class="cn-tabs-trigger"
				value={tab.value ?? `tab-${index + 1}`}
				disabled={tab.disabled}
			>
				{tab.label ?? tab}
			</TabsPrimitive.Trigger>
		{/each}
	</TabsPrimitive.List>
		{#each tabs as tab, index}
			<TabsPrimitive.Content
				data-slot="tabs-content"
				class="cn-tabs-content"
				value={tab.value ?? `tab-${index + 1}`}
			>
				{#if index === 0}
					{@render children?.()}
				{:else if tab.content}
					{tab.content}
				{/if}
			</TabsPrimitive.Content>
		{/each}
	{:else}
		{@render children?.()}
	{/if}
</TabsPrimitive.Root>
