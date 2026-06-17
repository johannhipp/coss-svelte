<script>
import { Slider as SliderPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<SliderPrimitive.Thumb
	data-slot="slider-thumb"
	class={cn("cn-slider-thumb", className)}
	{...rest}
>
	{@render children?.()}
</SliderPrimitive.Thumb>
