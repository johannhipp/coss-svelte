<script>
import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ToggleGroupPrimitive.Item
	data-slot="toggle-group-item"
	class={cn("cn-toggle-group-item", className)}
	{...rest}
>
	{@render children?.()}
</ToggleGroupPrimitive.Item>
