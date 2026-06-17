<script>
import { cn } from "../utils.js";

let {
	items = [],
	label = "Sidebar",
	side = "left",
	variant = "sidebar",
	collapsible = "offcanvas",
	state = "expanded",
	class: className = "",
	children,
	...rest
} = $props();
</script>

<aside
	data-slot="sidebar"
	data-sidebar="sidebar"
	data-side={side}
	data-variant={variant}
	data-collapsible={collapsible}
	data-state={state}
	class={cn("cn-sidebar", className)}
	aria-label={label}
	{...rest}
>
	{#if items.length}
		<nav class="cn-sidebar-legacy-nav">
			{#each items as item}
				<a href={item.href ?? "#"}>{item.label ?? item}</a>
			{/each}
		</nav>
	{/if}
	{@render children?.()}
</aside>
