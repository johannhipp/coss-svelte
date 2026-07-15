<script lang="ts">
import { Slider as SliderPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children = undefined, ...rest }: NativeProps = $props();
</script>

<SliderPrimitive.Range
	data-slot="slider-range"
	class={cn("cn-slider-range", className)}
	{...rest}
>
	{@render children?.()}
</SliderPrimitive.Range>
