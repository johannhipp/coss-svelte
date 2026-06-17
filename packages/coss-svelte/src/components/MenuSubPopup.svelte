<script>
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<MenuPrimitive.SubContent
	data-slot="menu-sub-popup"
	class={cn("cn-menu-sub-popup", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.SubContent>
