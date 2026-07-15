<script lang="ts">
import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>;
let { orientation = "vertical", class: className = "", children, ...rest }: Props = $props();
</script>

<ScrollAreaPrimitive.Scrollbar
	data-slot="scroll-area-scrollbar"
	class={cn("cn-scroll-area-scrollbar", className)}
	{orientation}
	{...rest}
>
	{@render children?.()}
</ScrollAreaPrimitive.Scrollbar>
