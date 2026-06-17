<script>
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<CollapsiblePrimitive.Content
	data-slot="collapsible-content"
	class={cn("cn-collapsible-content", className)}
	{...rest}
>
	{@render children?.()}
</CollapsiblePrimitive.Content>
