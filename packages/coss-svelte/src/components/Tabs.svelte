<script lang="ts">
import { Tabs as TabsPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";
import TabsList from "./TabsList.svelte";

type TabItem = string | { value?: string; label?: string; disabled?: boolean; content?: string };
type Props = Omit<ComponentProps<typeof TabsPrimitive.Root>, "children" | "child"> & {
	value?: string;
	tabs?: TabItem[];
	class?: string;
	children?: Snippet;
};

let {
	children,
	value = $bindable("tab-1"),
	tabs = children ? [] : ["Overview", "Details"],
	class: className = "",
	...rest
}: Props = $props();
</script>

<TabsPrimitive.Root data-slot="tabs" class={cn("cn-tabs", className)} bind:value {...rest}>
	{#if tabs.length}
		<TabsList>
		{#each tabs as tab, index}
			{@const tabObject = typeof tab === "object" && tab !== null ? tab : null}
			<TabsPrimitive.Trigger
				data-slot="tabs-trigger"
				class="cn-tabs-trigger"
				value={tabObject?.value ?? `tab-${index + 1}`}
				disabled={tabObject?.disabled}
			>
				{tabObject?.label ?? tab}
			</TabsPrimitive.Trigger>
		{/each}
		</TabsList>
		{#each tabs as tab, index}
			{@const tabObject = typeof tab === "object" && tab !== null ? tab : null}
			<TabsPrimitive.Content
				data-slot="tabs-content"
				class="cn-tabs-content"
				value={tabObject?.value ?? `tab-${index + 1}`}
			>
				{#if index === 0}
					{@render children?.()}
				{:else if tabObject?.content}
					{tabObject.content}
				{/if}
			</TabsPrimitive.Content>
		{/each}
	{:else}
		{@render children?.()}
	{/if}
</TabsPrimitive.Root>
