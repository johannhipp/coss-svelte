<script>
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	value = $bindable(""),
	items = [],
	placeholder = "Type a command",
	label = "Command menu",
	class: className = "",
	children: rootChildren,
	...rest
} = $props();
</script>

<CommandPrimitive.Root
	data-slot="command"
	class={cn("cn-command", className)}
	bind:value
	{label}
	{...rest}
>
	{#if rootChildren}
		{@render rootChildren()}
	{:else}
		<CommandPrimitive.Input data-slot="command-input" class="cn-command-input" {placeholder} />
		<CommandPrimitive.Empty data-slot="command-empty" class="cn-command-empty">
			No results found.
		</CommandPrimitive.Empty>
		<CommandPrimitive.List data-slot="command-list" class="cn-command-list">
			{#each items as item}
				<CommandPrimitive.Item
					data-slot="command-item"
					class="cn-command-item"
					value={item.value ?? item}
					disabled={item.disabled}
				>
					{item.label ?? item}
				</CommandPrimitive.Item>
			{/each}
		</CommandPrimitive.List>
	{/if}
</CommandPrimitive.Root>
