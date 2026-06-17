<script>
import { cn } from "../utils.js";

let { type = "button", showOnHover = false, class: className = "", children, ...rest } = $props();
</script>

<button
	data-slot="sidebar-menu-action"
	data-sidebar="menu-action"
	data-show-on-hover={showOnHover}
	class={cn("cn-sidebar-menu-action", className)}
	{type}
	{...rest}
>
	{@render children?.()}
</button>
