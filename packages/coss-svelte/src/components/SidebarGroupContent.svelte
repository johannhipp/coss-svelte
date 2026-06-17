<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<div
	data-slot="sidebar-group-content"
	data-sidebar="group-content"
	class={cn("cn-sidebar-group-content", className)}
	{...rest}
>
	{@render children?.()}
</div>
