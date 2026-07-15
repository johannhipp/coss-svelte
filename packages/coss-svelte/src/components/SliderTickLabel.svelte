<script lang="ts">
import { Slider as SliderPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof SliderPrimitive.TickLabel>;
let { index, class: className = "", children, ...rest }: Props = $props();
</script>

<SliderPrimitive.TickLabel
	data-slot="slider-tick-label"
	class={cn("cn-slider-tick-label", className)}
	{index}
	{...rest}
>
	{@render children?.()}
</SliderPrimitive.TickLabel>
