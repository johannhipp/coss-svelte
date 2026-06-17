<script>
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<CommandPrimitive.Viewport
	data-slot="command-panel"
	class={cn("cn-command-panel", className)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Viewport>
