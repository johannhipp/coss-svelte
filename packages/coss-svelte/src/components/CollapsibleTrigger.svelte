<script>
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<CollapsiblePrimitive.Trigger
	data-slot="collapsible-trigger"
	class={cn("cn-collapsible-trigger", className)}
	{...rest}
>
	{@render children?.()}
</CollapsiblePrimitive.Trigger>
