<script>
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<MenuPrimitive.SubTrigger
	data-slot="menu-sub-trigger"
	class={cn("cn-menu-sub-trigger", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.SubTrigger>
