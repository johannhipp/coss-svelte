<script>
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, forceMount = true, ...rest } = $props();
</script>

<CollapsiblePrimitive.Content
	data-slot="collapsible-content"
	class={cn("cn-collapsible-content", className)}
	{forceMount}
	{...rest}
>
	<div class="cn-collapsible-content-inner">
		{@render children?.()}
	</div>
</CollapsiblePrimitive.Content>
