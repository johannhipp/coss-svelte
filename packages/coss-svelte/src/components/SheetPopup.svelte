<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof DialogPrimitive.Content>, "children" | "child"> & {
	side?: "top" | "right" | "bottom" | "left";
	class?: string;
	children?: Snippet;
};

let { side = "right", class: className = "", children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Portal>
	<DialogPrimitive.Overlay data-slot="sheet-overlay" class="cn-dialog-overlay" />
	<DialogPrimitive.Content
		data-slot="sheet-popup"
		data-side={side}
		class={cn("cn-sheet", `cn-sheet-${side}`, className)}
		{...rest}
	>
		{@render children?.()}
	</DialogPrimitive.Content>
</DialogPrimitive.Portal>
