<script lang="ts">
import type { Snippet } from "svelte";
import type { NativeProps } from "../internal/props.js";
import { getSidebarContext } from "../internal/sidebar-context.svelte.js";
import { cn } from "../utils.js";

type SidebarItem = string | { label?: string; href?: string };
type Props = NativeProps & {
	items?: SidebarItem[];
	label?: string;
	side?: "left" | "right";
	variant?: "sidebar" | "floating" | "inset";
	collapsible?: "offcanvas" | "icon" | "none";
	state?: "expanded" | "collapsed";
	children?: Snippet;
};

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
}: Props = $props();

const sidebar = getSidebarContext();
let effectiveState = $derived(sidebar ? (sidebar.open ? "expanded" : "collapsed") : state);
</script>

<aside
	data-slot="sidebar"
	data-sidebar="sidebar"
	data-side={side}
	data-variant={variant}
	data-collapsible={collapsible}
	data-state={effectiveState}
	class={cn("cn-sidebar", className)}
	aria-label={label}
	{...rest}
>
	{#if items.length}
		<nav class="cn-sidebar-legacy-nav">
			{#each items as item}
				{@const itemObject = typeof item === "object" && item !== null ? item : null}
				<a href={itemObject?.href ?? "#"}>{itemObject?.label ?? item}</a>
			{/each}
		</nav>
	{/if}
	{@render children?.()}
</aside>
