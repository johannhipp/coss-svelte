<script>
import { Select as SelectPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<SelectPrimitive.Viewport
	data-slot="select-viewport"
	class={cn("cn-select-viewport", className)}
	{...rest}
>
	{@render children?.()}
</SelectPrimitive.Viewport>
