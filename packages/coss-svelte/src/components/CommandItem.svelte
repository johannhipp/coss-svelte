<script>
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<CommandPrimitive.Item
	data-slot="command-item"
	class={cn("cn-command-item", className)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Item>
