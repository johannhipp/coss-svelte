<script lang="ts">
import { Slider as SliderPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof SliderPrimitive.TickLabel>, "child">;
let { ref = $bindable(null), index, class: className = "", children, ...rest }: Props = $props();
</script>

<SliderPrimitive.TickLabel
	bind:ref
	data-slot="slider-tick-label"
	class={cn("cn-slider-tick-label", className)}
	{index}
	{...rest}
>
	{@render children?.()}
</SliderPrimitive.TickLabel>
