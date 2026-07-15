<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type MenuItem = string | { label?: string; disabled?: boolean };
type Props = Omit<ComponentProps<typeof MenuPrimitive.Root>, "children" | "child"> & {
	open?: boolean;
	items?: MenuItem[];
	label?: string;
	class?: string;
	children?: Snippet;
};

let {
	open = $bindable(false),
	items = [],
	label = "Menu",
	class: className = "",
	children: rootChildren,
	...rest
}: Props = $props();
</script>

<MenuPrimitive.Root bind:open {...rest}>
	{#if rootChildren}
		{@render rootChildren()}
	{:else}
		<MenuPrimitive.Trigger data-slot="menu-trigger" class="cn-menu-trigger">
			{label}
		</MenuPrimitive.Trigger>
		<MenuPrimitive.Portal>
			<MenuPrimitive.Content data-slot="menu-popup" class={cn("cn-menu-popup", className)}>
			{#each items as item}
				{@const itemObject = typeof item === "object" && item !== null ? item : null}
				<MenuPrimitive.Item data-slot="menu-item" class="cn-menu-item" disabled={itemObject?.disabled}>
					{itemObject?.label ?? item}
					</MenuPrimitive.Item>
				{/each}
			</MenuPrimitive.Content>
		</MenuPrimitive.Portal>
	{/if}
</MenuPrimitive.Root>
