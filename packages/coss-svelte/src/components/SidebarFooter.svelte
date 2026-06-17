<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<div
	data-slot="sidebar-footer"
	data-sidebar="footer"
	class={cn("cn-sidebar-footer", className)}
	{...rest}
>
	{@render children?.()}
</div>
