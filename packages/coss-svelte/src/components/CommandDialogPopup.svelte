<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type PortalOptions = Omit<ComponentProps<typeof DialogPrimitive.Portal>, "children">;
type Props = Omit<
	ComponentProps<typeof DialogPrimitive.Content>,
	"child" | "children" | "interactOutsideBehavior"
> & {
	portalProps?: PortalOptions;
	class?: string;
	children?: Snippet;
};

let {
	ref = $bindable(null),
	portalProps = {},
	class: className = "",
	children,
	...rest
}: Props = $props();
</script>

<DialogPrimitive.Portal {...portalProps}>
	<DialogPrimitive.Overlay data-slot="command-dialog-overlay" class="cn-dialog-overlay" />
	<DialogPrimitive.Content
	bind:ref
		{...rest}
		data-slot="command-dialog-popup"
		class={cn("cn-dialog cn-command-dialog-popup", className)}
		interactOutsideBehavior="close"
	>
		{@render children?.()}
	</DialogPrimitive.Content>
</DialogPrimitive.Portal>
