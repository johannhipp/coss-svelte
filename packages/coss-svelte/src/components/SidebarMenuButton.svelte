<script>
import { cn } from "../utils.js";

let {
	href = undefined,
	type = "button",
	isActive = false,
	size = "default",
	variant = "default",
	class: className = "",
	children,
	...rest
} = $props();
</script>

{#if href}
	<a
		data-slot="sidebar-menu-button"
		data-sidebar="menu-button"
		data-active={isActive}
		data-size={size}
		data-variant={variant}
		class={cn("cn-sidebar-menu-button", className)}
		{href}
		{...rest}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		data-slot="sidebar-menu-button"
		data-sidebar="menu-button"
		data-active={isActive}
		data-size={size}
		data-variant={variant}
		class={cn("cn-sidebar-menu-button", className)}
		{type}
		{...rest}
	>
		{@render children?.()}
	</button>
{/if}
