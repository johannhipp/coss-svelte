<script>
import { Tabs as TabsPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<TabsPrimitive.Trigger
	data-slot="tabs-trigger"
	class={cn("cn-tabs-trigger", className)}
	{...rest}
>
	{@render children?.()}
</TabsPrimitive.Trigger>
