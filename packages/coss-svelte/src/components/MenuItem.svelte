<script>
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<MenuPrimitive.Item
	data-slot="menu-item"
	class={cn("cn-menu-item", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.Item>
