<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<li
	data-slot="sidebar-menu-item"
	data-sidebar="menu-item"
	class={cn("cn-sidebar-menu-item", className)}
	{...rest}
>
	{@render children?.()}
</li>
