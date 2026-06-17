<script>
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<CommandPrimitive.GroupHeading
	data-slot="command-group-label"
	class={cn("cn-command-group-label", className)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.GroupHeading>
