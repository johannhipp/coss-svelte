<script>
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	open = $bindable(false),
	items = [],
	label = "Menu",
	class: className = "",
	children: rootChildren,
	...rest
} = $props();
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
					<MenuPrimitive.Item data-slot="menu-item" class="cn-menu-item" disabled={item.disabled}>
						{item.label ?? item}
					</MenuPrimitive.Item>
				{/each}
			</MenuPrimitive.Content>
		</MenuPrimitive.Portal>
	{/if}
</MenuPrimitive.Root>
