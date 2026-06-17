<script>
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<MenuPrimitive.GroupHeading
	data-slot="menu-group-label"
	class={cn("cn-menu-group-label", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.GroupHeading>
