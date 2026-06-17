<script>
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<MenuPrimitive.Separator
	data-slot="menu-separator"
	class={cn("cn-menu-separator", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.Separator>
