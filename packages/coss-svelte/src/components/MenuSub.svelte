<script>
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { open = $bindable(false), class: className = "", children, ...rest } = $props();
</script>

<MenuPrimitive.Sub bind:open {...rest}>
	<span data-slot="menu-sub" class={cn("cn-menu-sub-shell", className)}>
		{@render children?.()}
	</span>
</MenuPrimitive.Sub>
