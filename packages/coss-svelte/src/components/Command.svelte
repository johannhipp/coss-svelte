<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type CommandItem = string | { value?: string; label?: string; disabled?: boolean };
type Props = Omit<ComponentProps<typeof CommandPrimitive.Root>, "children" | "child"> & {
	value?: string;
	items?: CommandItem[];
	placeholder?: string;
	label?: string;
	class?: string;
	children?: Snippet;
};

let {
	ref = $bindable(null),
	value = $bindable(""),
	items = [],
	placeholder = "Type a command",
	label = "Command menu",
	class: className = "",
	children: rootChildren,
	...rest
}: Props = $props();
</script>

<CommandPrimitive.Root
	bind:ref
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
				{@const itemObject = typeof item === "object" && item !== null ? item : null}
				<CommandPrimitive.Item
					data-slot="command-item"
					class="cn-command-item"
					value={itemObject?.value ?? (typeof item === "string" ? item : "")}
					disabled={itemObject?.disabled}
				>
					{itemObject?.label ?? item}
				</CommandPrimitive.Item>
			{/each}
		</CommandPrimitive.List>
	{/if}
</CommandPrimitive.Root>
