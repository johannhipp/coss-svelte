<script>
import { Command as CommandPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { value = $bindable(""), class: className = "", ...rest } = $props();
</script>

<CommandPrimitive.Input
	data-slot="command-input"
	class={cn("cn-command-input", className)}
	bind:value
	{...rest}
/>
