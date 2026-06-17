<script>
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<CommandPrimitive.Empty
	data-slot="command-empty"
	class={cn("cn-command-empty", className)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Empty>
