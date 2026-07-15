<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof DialogPrimitive.Root>, "children" | "child"> & {
	open?: boolean;
	trigger?: string;
	title?: string;
	description?: string;
	class?: string;
	children?: Snippet;
};

let {
	open = $bindable(false),
	trigger = "Open dialog",
	title = "",
	description = "",
	class: className = "",
	children: rootChildren,
	...rest
}: Props = $props();
</script>

<DialogPrimitive.Root bind:open {...rest}>
	{#if title || description}
		<DialogPrimitive.Trigger data-slot="dialog-trigger" class="cn-dialog-trigger">
			{trigger}
		</DialogPrimitive.Trigger>
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay data-slot="dialog-overlay" class="cn-dialog-overlay" />
			<DialogPrimitive.Content data-slot="dialog-popup" class={cn("cn-dialog", className)}>
				{#if title}
					<DialogPrimitive.Title data-slot="dialog-title" class="cn-dialog-title">
						{title}
					</DialogPrimitive.Title>
				{/if}
				{#if description}
					<DialogPrimitive.Description data-slot="dialog-description" class="cn-dialog-description">
						{description}
					</DialogPrimitive.Description>
				{/if}
				{@render rootChildren?.()}
				<DialogPrimitive.Close data-slot="dialog-close" class="cn-dialog-close">
					Close
				</DialogPrimitive.Close>
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	{:else}
		{@render rootChildren?.()}
	{/if}
</DialogPrimitive.Root>
