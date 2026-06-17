<script>
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<MenuPrimitive.Portal>
	<MenuPrimitive.Content data-slot="menu-popup" class={cn("cn-menu-popup", className)} {...rest}>
		{@render children?.()}
	</MenuPrimitive.Content>
</MenuPrimitive.Portal>
