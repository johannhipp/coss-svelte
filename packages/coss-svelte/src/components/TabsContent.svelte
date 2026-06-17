<script>
import { Tabs as TabsPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<TabsPrimitive.Content
	data-slot="tabs-content"
	class={cn("cn-tabs-content", className)}
	{...rest}
>
	{@render children?.()}
</TabsPrimitive.Content>
