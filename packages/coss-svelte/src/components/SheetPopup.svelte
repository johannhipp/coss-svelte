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
};

let {
	ref = $bindable(null),
	side = "right",
	portalProps = {},
	class: className = "",
	children,
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
	</DialogPrimitive.Content>
</DialogPrimitive.Portal>
