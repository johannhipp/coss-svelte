<script lang="ts">
import { Popover as PopoverPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof PopoverPrimitive.Content>, "children" | "child"> & {
	class?: string;
	children?: Snippet;
};

let { class: className = "", children, ...rest }: Props = $props();
</script>

<PopoverPrimitive.Portal>
	<PopoverPrimitive.Content data-slot="popover-popup" class={cn("cn-popover-content", className)} {...rest}>
		{@render children?.()}
	</PopoverPrimitive.Content>
</PopoverPrimitive.Portal>
