<script lang="ts">
import { Slider as SliderPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof SliderPrimitive.Thumb>, "children" | "child"> & {
	children?: Snippet;
};
let { ref = $bindable(null), index, class: className = "", children, ...rest }: Props = $props();
</script>

<SliderPrimitive.Thumb
	bind:ref
	data-slot="slider-thumb"
	class={cn("cn-slider-thumb", className)}
	{index}
	{...rest}
>
	{@render children?.()}
</SliderPrimitive.Thumb>
