<script>
import { Select as SelectPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<SelectPrimitive.Item
	data-slot="select-item"
	class={cn("cn-select-item", className)}
	{...rest}
>
	{@render children?.()}
</SelectPrimitive.Item>
