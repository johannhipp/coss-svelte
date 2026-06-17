<script>
import { cn } from "../utils.js";

let {
	defaultOpen = true,
	open = $bindable(defaultOpen),
	class: className = "",
	children,
	...rest
} = $props();

let state = $derived(open ? "expanded" : "collapsed");
</script>

<div
	data-slot="sidebar-wrapper"
	data-state={state}
	class={cn("cn-sidebar-wrapper", className)}
	{...rest}
>
	{@render children?.()}
</div>
