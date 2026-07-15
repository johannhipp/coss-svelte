<script lang="ts">
import type { HTMLButtonAttributes } from "svelte/elements";
import { getSidebarContext } from "../internal/sidebar-context.svelte.js";
import { cn } from "../utils.js";

let { type = "button", class: className = "", children, ...rest }: HTMLButtonAttributes = $props();
const sidebar = getSidebarContext();
</script>

<button
	data-slot="sidebar-trigger"
	data-sidebar="trigger"
	class={cn("cn-sidebar-trigger", className)}
	aria-label="Toggle Sidebar"
	aria-expanded={sidebar?.open}
	onclick={() => sidebar?.toggle()}
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
