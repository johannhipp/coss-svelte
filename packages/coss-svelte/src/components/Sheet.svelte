<script>
import { Dialog as DialogPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	open = $bindable(false),
	side = "right",
	trigger = "Open sheet",
	title = "",
	description = "",
	class: className = "",
	children: rootChildren,
	...rest
} = $props();
</script>

<DialogPrimitive.Root bind:open {...rest}>
	{#if title || description}
		<DialogPrimitive.Trigger data-slot="sheet-trigger" class="cn-sheet-trigger">
			{trigger}
		</DialogPrimitive.Trigger>
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay data-slot="sheet-overlay" class="cn-dialog-overlay" />
			<DialogPrimitive.Content
				data-slot="sheet-popup"
				data-side={side}
				class={cn("cn-sheet", `cn-sheet-${side}`, className)}
			>
				<header data-slot="sheet-header" class="cn-sheet-header">
					<DialogPrimitive.Title data-slot="sheet-title" class="cn-sheet-title">
						{title}
					</DialogPrimitive.Title>
					{#if description}
						<DialogPrimitive.Description data-slot="sheet-description" class="cn-sheet-description">
							{description}
						</DialogPrimitive.Description>
					{/if}
				</header>
				<div data-slot="sheet-panel" class="cn-sheet-panel">
					{@render rootChildren?.()}
				</div>
				<footer data-slot="sheet-footer" class="cn-sheet-footer">
					<DialogPrimitive.Close data-slot="sheet-close" class="cn-sheet-close">
						Close
					</DialogPrimitive.Close>
				</footer>
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	{:else}
		{@render rootChildren?.()}
	{/if}
</DialogPrimitive.Root>
