<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type PortalOptions = Omit<ComponentProps<typeof DialogPrimitive.Portal>, "children">;
type Props = Omit<
	ComponentProps<typeof DialogPrimitive.Content>,
	"child" | "children" | "interactOutsideBehavior"
> & {
	side?: "top" | "right" | "bottom" | "left";
	portalProps?: PortalOptions;
	class?: string;
	children?: Snippet;
	showCloseButton?: boolean;
};

let {
	ref = $bindable(null),
	side = "right",
	portalProps = {},
	class: className = "",
	children,
	showCloseButton = true,
	...rest
}: Props = $props();
</script>

<DialogPrimitive.Portal {...portalProps}>
	<DialogPrimitive.Overlay data-slot="sheet-overlay" class="cn-dialog-overlay" />
	<DialogPrimitive.Content
	bind:ref
		{...rest}
		data-slot="sheet-popup"
		data-side={side}
		class={cn("cn-sheet", `cn-sheet-${side}`, className)}
		interactOutsideBehavior="close"
	>
		{@render children?.()}
		{#if showCloseButton}
			<DialogPrimitive.Close data-slot="sheet-close-x" class="cn-dialog-close-x" aria-label="Close">
				<svg
					aria-hidden="true"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M18 6 6 18" />
					<path d="m6 6 12 12" />
				</svg>
			</DialogPrimitive.Close>
		{/if}
	</DialogPrimitive.Content>
</DialogPrimitive.Portal>
