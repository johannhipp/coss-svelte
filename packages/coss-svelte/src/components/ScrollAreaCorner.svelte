<script lang="ts">
import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ScrollAreaPrimitive.Corner>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<ScrollAreaPrimitive.Corner
	bind:ref
	data-slot="scroll-area-corner"
	class={cn("cn-scroll-area-corner", className)}
	{...rest}
>
	{@render children?.()}
</ScrollAreaPrimitive.Corner>
