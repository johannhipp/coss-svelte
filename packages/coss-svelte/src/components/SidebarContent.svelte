<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<div
	data-slot="sidebar-content"
	data-sidebar="content"
	class={cn("cn-sidebar-content", className)}
	{...rest}
>
	{@render children?.()}
</div>
