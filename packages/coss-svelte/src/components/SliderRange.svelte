<script lang="ts">
import { Slider as SliderPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof SliderPrimitive.Range>, "child">;

let {
	ref = $bindable(null),
	class: className = "",
	children = undefined,
	...rest
}: Props = $props();
</script>

<SliderPrimitive.Range
	bind:ref
	data-slot="slider-range"
	class={cn("cn-slider-range", className)}
	{...rest}
>
	{@render children?.()}
</SliderPrimitive.Range>
