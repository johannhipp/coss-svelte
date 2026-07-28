<script lang="ts">
import { Slider as SliderPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof SliderPrimitive.Tick>, "child">;
let { ref = $bindable(null), index, class: className = "", children, ...rest }: Props = $props();
</script>

<SliderPrimitive.Tick
	bind:ref
	data-slot="slider-tick"
	class={cn("cn-slider-tick", className)}
	{index}
	{...rest}
>
	{@render children?.()}
</SliderPrimitive.Tick>
