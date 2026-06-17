<script>
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<CommandPrimitive.List
	data-slot="command-list"
	class={cn("cn-command-list", className)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.List>
