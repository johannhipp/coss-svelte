<script>
import { cn } from "../utils.js";

let { class: className = "", ...rest } = $props();
</script>

<div
	data-slot="sidebar-separator"
	data-sidebar="separator"
	class={cn("cn-sidebar-separator", className)}
	role="separator"
	{...rest}
></div>
