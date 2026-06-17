<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ul
	data-slot="sidebar-menu-sub"
	data-sidebar="menu-sub"
	class={cn("cn-sidebar-menu-sub", className)}
	{...rest}
>
	{@render children?.()}
</ul>
