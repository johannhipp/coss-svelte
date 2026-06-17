<script>
import { cn } from "../utils.js";

let { showIcon = false, class: className = "", ...rest } = $props();
</script>

<div
	data-slot="sidebar-menu-skeleton"
	data-sidebar="menu-skeleton"
	class={cn("cn-sidebar-menu-skeleton", className)}
	{...rest}
>
	{#if showIcon}
		<span data-sidebar="menu-skeleton-icon" class="cn-sidebar-menu-skeleton-icon"></span>
	{/if}
	<span data-sidebar="menu-skeleton-text" class="cn-sidebar-menu-skeleton-text"></span>
</div>
