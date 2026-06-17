<script>
import { Slider as SliderPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<SliderPrimitive.Tick
	data-slot="slider-tick"
	class={cn("cn-slider-tick", className)}
	{...rest}
>
	{@render children?.()}
</SliderPrimitive.Tick>
