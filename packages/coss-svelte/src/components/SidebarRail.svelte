<script lang="ts">
import type { HTMLButtonAttributes } from "svelte/elements";
import { getSidebarContext } from "../internal/sidebar-context.svelte.js";
import { cn } from "../utils.js";

let { type = "button", class: className = "", ...rest }: HTMLButtonAttributes = $props();
const sidebar = getSidebarContext();
</script>

<button
	data-slot="sidebar-rail"
	data-sidebar="rail"
	class={cn("cn-sidebar-rail", className)}
	aria-label="Toggle Sidebar"
	aria-expanded={sidebar?.open}
	onclick={() => sidebar?.toggle()}
	tabindex="-1"
	title="Toggle Sidebar"
	{type}
	{...rest}
></button>
