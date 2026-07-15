<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<li
	data-slot="sidebar-menu-item"
	data-sidebar="menu-item"
	class={cn("cn-sidebar-menu-item", className)}
	{...rest}
>
	{@render children?.()}
</li>
