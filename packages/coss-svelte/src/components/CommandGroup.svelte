<script>
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<CommandPrimitive.Group
	data-slot="command-group"
	class={cn("cn-command-group", className)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Group>
