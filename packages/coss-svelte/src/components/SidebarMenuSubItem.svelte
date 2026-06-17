<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<li
	data-slot="sidebar-menu-sub-item"
	data-sidebar="menu-sub-item"
	class={cn("cn-sidebar-menu-sub-item", className)}
	{...rest}
>
	{@render children?.()}
</li>
