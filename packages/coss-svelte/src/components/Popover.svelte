<script lang="ts">
import { Popover as PopoverPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof PopoverPrimitive.Root>, "children" | "child"> & {
	open?: boolean;
	label?: string;
	class?: string;
	children?: Snippet;
};

let {
	open = $bindable(false),
	label = "Popover",
	class: className = "",
	children: rootChildren,
	...rest
}: Props = $props();
</script>

<PopoverPrimitive.Root bind:open {...rest}>
	{#if rootChildren}
		{@render rootChildren()}
	{:else}
		<PopoverPrimitive.Trigger data-slot="popover-trigger" class="cn-popover-trigger">
			{label}
		</PopoverPrimitive.Trigger>
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content data-slot="popover-popup" class={cn("cn-popover-content", className)}>
				{label}
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Portal>
	{/if}
</PopoverPrimitive.Root>
