<script>
import { cn } from "../utils.js";

let { class: className = "", ...rest } = $props();
</script>

<input
	data-slot="sidebar-input"
	data-sidebar="input"
	class={cn("cn-sidebar-input", className)}
	{...rest}
/>
