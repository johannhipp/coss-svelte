<script lang="ts">
import { Slider as SliderPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof SliderPrimitive.Tick>;
let { index, class: className = "", children, ...rest }: Props = $props();
</script>

<SliderPrimitive.Tick
	data-slot="slider-tick"
	class={cn("cn-slider-tick", className)}
	{index}
	{...rest}
>
	{@render children?.()}
</SliderPrimitive.Tick>
