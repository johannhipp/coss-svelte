<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<div
	data-slot="sidebar-group"
	data-sidebar="group"
	class={cn("cn-sidebar-group", className)}
	{...rest}
>
	{@render children?.()}
</div>
