<script>
import { Select as SelectPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<SelectPrimitive.ScrollDownButton
	data-slot="select-scroll-down-button"
	class={cn("cn-select-scroll-button", className)}
	{...rest}
>
	{@render children?.()}
</SelectPrimitive.ScrollDownButton>
