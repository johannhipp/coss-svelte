<script lang="ts">
import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ScrollAreaPrimitive.Root>, "children" | "child"> & {
	class?: string;
	children?: Snippet;
};

let { class: className = "", children, ...rest }: Props = $props();
</script>

<ScrollAreaPrimitive.Root data-slot="scroll-area" class={cn("cn-scroll-area", className)} {...rest}>
	{@render children?.()}
</ScrollAreaPrimitive.Root>
