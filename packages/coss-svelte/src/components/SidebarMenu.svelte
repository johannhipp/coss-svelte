<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ul data-slot="sidebar-menu" data-sidebar="menu" class={cn("cn-sidebar-menu", className)} {...rest}>
	{@render children?.()}
</ul>
