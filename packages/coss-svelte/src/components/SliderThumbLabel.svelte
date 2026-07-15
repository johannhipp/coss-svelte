<script lang="ts">
import { Slider as SliderPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof SliderPrimitive.ThumbLabel>;
let { index, class: className = "", children, ...rest }: Props = $props();
</script>

<SliderPrimitive.ThumbLabel
	data-slot="slider-thumb-label"
	class={cn("cn-slider-thumb-label", className)}
	{index}
	{...rest}
>
	{@render children?.()}
</SliderPrimitive.ThumbLabel>
