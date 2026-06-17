<script>
import { Slider as SliderPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<SliderPrimitive.ThumbLabel
	data-slot="slider-thumb-label"
	class={cn("cn-slider-thumb-label", className)}
	{...rest}
>
	{@render children?.()}
</SliderPrimitive.ThumbLabel>
