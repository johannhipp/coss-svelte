<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<div
	data-slot="sidebar-menu-badge"
	data-sidebar="menu-badge"
	class={cn("cn-sidebar-menu-badge", className)}
	{...rest}
>
	{@render children?.()}
</div>
