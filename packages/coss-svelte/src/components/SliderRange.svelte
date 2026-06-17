<script>
import { Slider as SliderPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<SliderPrimitive.Range
	data-slot="slider-range"
	class={cn("cn-slider-range", className)}
	{...rest}
>
	{@render children?.()}
</SliderPrimitive.Range>
