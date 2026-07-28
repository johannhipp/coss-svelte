<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";
import DrawerCreateHandle from "./DrawerCreateHandle.svelte";

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
	trigger = "Open drawer",
	title = "",
	description = "",
	class: className = "",
	children: rootChildren,
	...rest
}: Props = $props();
</script>

<DialogPrimitive.Root bind:open {...rest}>
	{#if rootChildren}
		{@render rootChildren()}
	{:else if title || description}
		<DialogPrimitive.Trigger data-slot="drawer-trigger" class="cn-drawer-trigger">
			{trigger}
		</DialogPrimitive.Trigger>
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay data-slot="drawer-overlay" class="cn-dialog-overlay" />
			<DialogPrimitive.Content
				data-slot="drawer-popup"
				class={cn("cn-drawer", className)}
				interactOutsideBehavior="close"
			>
				<DrawerCreateHandle />
				<header data-slot="drawer-header" class="cn-drawer-header">
					<DialogPrimitive.Title data-slot="drawer-title" class="cn-drawer-title">
						{title}
					</DialogPrimitive.Title>
					{#if description}
						<DialogPrimitive.Description data-slot="drawer-description" class="cn-drawer-description">
							{description}
						</DialogPrimitive.Description>
					{/if}
				</header>
				<div data-slot="drawer-panel" class="cn-drawer-panel"></div>
				<footer data-slot="drawer-footer" class="cn-drawer-footer">
					<DialogPrimitive.Close data-slot="drawer-close" class="cn-drawer-close">
						Close
					</DialogPrimitive.Close>
				</footer>
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	{/if}
</DialogPrimitive.Root>
