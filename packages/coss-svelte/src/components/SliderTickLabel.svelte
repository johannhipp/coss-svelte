<script>
import { Slider as SliderPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<SliderPrimitive.TickLabel
	data-slot="slider-tick-label"
	class={cn("cn-slider-tick-label", className)}
	{...rest}
>
	{@render children?.()}
</SliderPrimitive.TickLabel>
