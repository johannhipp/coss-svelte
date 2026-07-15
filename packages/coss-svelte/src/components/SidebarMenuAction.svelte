<script lang="ts">
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../utils.js";

type Props = HTMLButtonAttributes & { showOnHover?: boolean };
let {
	type = "button",
	showOnHover = false,
	class: className = "",
	children,
	...rest
}: Props = $props();
</script>

<button
	data-slot="sidebar-menu-action"
	data-sidebar="menu-action"
	data-show-on-hover={showOnHover}
	class={cn("cn-sidebar-menu-action", className)}
	{type}
	{...rest}
>
	{@render children?.()}
</button>
