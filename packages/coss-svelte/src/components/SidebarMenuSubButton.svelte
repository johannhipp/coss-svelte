<script lang="ts">
import type { Snippet } from "svelte";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let {
	href = "#",
	isActive = false,
	size = "md",
	class: className = "",
	children,
	...rest
}: NativeProps<HTMLAnchorElement> & {
	href?: string;
	isActive?: boolean;
	size?: "sm" | "md" | "lg";
	children?: Snippet;
} = $props();
</script>

<a
	data-slot="sidebar-menu-sub-button"
	data-sidebar="menu-sub-button"
	data-active={isActive}
	data-size={size}
	class={cn("cn-sidebar-menu-sub-button", className)}
	{href}
	{...rest}
>
	{@render children?.()}
</a>
