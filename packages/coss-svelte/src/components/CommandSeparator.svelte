<script>
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<CommandPrimitive.Separator
	data-slot="command-separator"
	class={cn("cn-command-separator", className)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Separator>
