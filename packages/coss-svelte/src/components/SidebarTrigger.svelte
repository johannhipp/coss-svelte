<script>
import { cn } from "../utils.js";

let { type = "button", class: className = "", children, ...rest } = $props();
</script>

<button
	data-slot="sidebar-trigger"
	data-sidebar="trigger"
	class={cn("cn-sidebar-trigger", className)}
	aria-label="Toggle Sidebar"
	{type}
	{...rest}
>
	{#if children}
		{@render children()}
	{:else}
		<span class="cn-sidebar-trigger-icon" aria-hidden="true"></span>
		<span class="sr-only">Toggle Sidebar</span>
	{/if}
</button>
