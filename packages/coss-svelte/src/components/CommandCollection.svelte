<script>
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<CommandPrimitive.GroupItems
	data-slot="command-collection"
	class={cn("cn-command-collection", className)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.GroupItems>
