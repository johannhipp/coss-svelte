<script>
import { cn } from "../utils.js";

let { type = "button", class: className = "", ...rest } = $props();
</script>

<button
	data-slot="sidebar-rail"
	data-sidebar="rail"
	class={cn("cn-sidebar-rail", className)}
	aria-label="Toggle Sidebar"
	tabindex="-1"
	title="Toggle Sidebar"
	{type}
	{...rest}
></button>
