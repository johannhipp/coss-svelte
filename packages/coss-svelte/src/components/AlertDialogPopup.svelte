<script lang="ts">
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import { type ComponentProps, getContext, type Snippet } from "svelte";
import { cn } from "../utils.js";

type AlertDialogContext = {
	close: () => void;
};

type Props = Omit<ComponentProps<typeof AlertDialogPrimitive.Content>, "children" | "child"> & {
	class?: string;
	children?: Snippet;
};

let {
	interactOutsideBehavior = "close",
	class: className = "",
	children,
	...rest
}: Props = $props();

const alertDialogContext = getContext<AlertDialogContext>("coss-svelte-alert-dialog");
</script>

<AlertDialogPrimitive.Portal>
	<AlertDialogPrimitive.Overlay
		data-slot="alert-dialog-overlay"
		class="cn-dialog-overlay"
		onclick={alertDialogContext.close}
	/>
	<AlertDialogPrimitive.Content
		data-slot="alert-dialog-popup"
		class={cn("cn-dialog cn-alert-dialog", className)}
		{interactOutsideBehavior}
		{...rest}
	>
		{@render children?.()}
	</AlertDialogPrimitive.Content>
</AlertDialogPrimitive.Portal>
