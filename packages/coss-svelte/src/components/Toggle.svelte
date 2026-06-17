<script>
import { Toggle as TogglePrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { pressed = $bindable(false), class: className = "", children, ...rest } = $props();
</script>

<TogglePrimitive.Root
	data-slot="toggle"
	class={cn("cn-toggle", pressed && "cn-toggle-pressed", className)}
	bind:pressed
	{...rest}
>
	{@render children?.()}
</TogglePrimitive.Root>
