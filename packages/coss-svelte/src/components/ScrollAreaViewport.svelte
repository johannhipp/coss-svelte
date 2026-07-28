<script lang="ts">
import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ScrollAreaPrimitive.Viewport>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<ScrollAreaPrimitive.Viewport
	bind:ref
	data-slot="scroll-area-viewport"
	class={cn("cn-scroll-area-viewport", className)}
	{...rest}
>
	{@render children?.()}
</ScrollAreaPrimitive.Viewport>
