<script lang="ts">
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type PortalOptions = Omit<ComponentProps<typeof AlertDialogPrimitive.Portal>, "children">;
type Props = Omit<
	ComponentProps<typeof AlertDialogPrimitive.Content>,
	"child" | "children" | "interactOutsideBehavior" | "onInteractOutside"
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

<AlertDialogPrimitive.Portal {...portalProps}>
	<AlertDialogPrimitive.Overlay data-slot="alert-dialog-overlay" class="cn-dialog-overlay" />
	<AlertDialogPrimitive.Content
	bind:ref
		{...rest}
		data-slot="alert-dialog-popup"
		class={cn("cn-dialog cn-alert-dialog", className)}
		interactOutsideBehavior="close"
	>
		{@render children?.()}
	</AlertDialogPrimitive.Content>
</AlertDialogPrimitive.Portal>
