<script>
import { Select as SelectPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<SelectPrimitive.GroupHeading
	data-slot="select-group-label"
	class={cn("cn-select-group-label", className)}
	{...rest}
>
	{@render children?.()}
</SelectPrimitive.GroupHeading>
