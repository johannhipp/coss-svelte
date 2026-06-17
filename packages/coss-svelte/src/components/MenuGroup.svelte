<script>
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<MenuPrimitive.Group
	data-slot="menu-group"
	class={cn("cn-menu-group", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.Group>
