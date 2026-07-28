<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof CollapsiblePrimitive.Root>, "children" | "child"> & {
	open?: boolean;
	title?: string;
	class?: string;
	children?: Snippet;
};

let {
	ref = $bindable(null),
	open = $bindable(false),
	title = "",
	class: className = "",
	children,
	...rest
}: Props = $props();
</script>

<CollapsiblePrimitive.Root
	bind:ref
	data-slot="collapsible"
	class={cn("cn-collapsible", className)}
	bind:open
	{...rest}
>
	{#if title}
		<CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" class="cn-collapsible-trigger">
			{title}
		</CollapsiblePrimitive.Trigger>
		<CollapsiblePrimitive.Content
			data-slot="collapsible-content"
			class="cn-collapsible-content"
			forceMount
		>
			<div class="cn-collapsible-content-inner">
				{@render children?.()}
			</div>
		</CollapsiblePrimitive.Content>
	{:else}
		{@render children?.()}
	{/if}
</CollapsiblePrimitive.Root>
