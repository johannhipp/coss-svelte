<script lang="ts">
import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ScrollAreaPrimitive.Thumb>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<ScrollAreaPrimitive.Thumb
	bind:ref
	data-slot="scroll-area-thumb"
	class={cn("cn-scroll-area-thumb", className)}
	{...rest}
>
	{@render children?.()}
</ScrollAreaPrimitive.Thumb>
