<script lang="ts">
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof AlertDialogPrimitive.Root>, "children" | "child"> & {
	open?: boolean;
	trigger?: string;
	title?: string;
	description?: string;
	class?: string;
	children?: Snippet;
};

let {
	open = $bindable(false),
	trigger = "Open alert dialog",
	title = "",
	description = "",
	class: className = "",
	children: rootChildren,
	...rest
}: Props = $props();
</script>

<AlertDialogPrimitive.Root bind:open {...rest}>
	{#if title || description}
		<AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" class="cn-alert-dialog-trigger">
			{trigger}
		</AlertDialogPrimitive.Trigger>
		<AlertDialogPrimitive.Portal>
			<AlertDialogPrimitive.Overlay data-slot="alert-dialog-overlay" class="cn-dialog-overlay" />
			<AlertDialogPrimitive.Content
				data-slot="alert-dialog-popup"
				class={cn("cn-dialog cn-alert-dialog", className)}
			>
				<div class="cn-alert-dialog-header">
					{#if title}
						<AlertDialogPrimitive.Title data-slot="alert-dialog-title" class="cn-dialog-title">
							{title}
						</AlertDialogPrimitive.Title>
					{/if}
					{#if description}
						<AlertDialogPrimitive.Description
							data-slot="alert-dialog-description"
							class="cn-dialog-description"
						>
							{description}
						</AlertDialogPrimitive.Description>
					{/if}
					{@render rootChildren?.()}
				</div>
				<div class="cn-alert-dialog-footer cn-alert-dialog-actions">
					<AlertDialogPrimitive.Cancel data-slot="alert-dialog-cancel" class="cn-alert-dialog-cancel">
						Cancel
					</AlertDialogPrimitive.Cancel>
					<AlertDialogPrimitive.Action data-slot="alert-dialog-action" class="cn-alert-dialog-action">
						Confirm
					</AlertDialogPrimitive.Action>
				</div>
			</AlertDialogPrimitive.Content>
		</AlertDialogPrimitive.Portal>
	{:else}
		{@render rootChildren?.()}
	{/if}
</AlertDialogPrimitive.Root>
