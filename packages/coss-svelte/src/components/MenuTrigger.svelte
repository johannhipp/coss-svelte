<script>
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<MenuPrimitive.Trigger
	data-slot="menu-trigger"
	class={cn("cn-menu-trigger", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.Trigger>
