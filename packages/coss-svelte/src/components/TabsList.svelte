<script>
import { Tabs as TabsPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<TabsPrimitive.List
	data-slot="tabs-list"
	class={cn("cn-tabs-list", className)}
	{...rest}
>
	{@render children?.()}
</TabsPrimitive.List>
