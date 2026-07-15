<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<div
	data-slot="sidebar-menu-badge"
	data-sidebar="menu-badge"
	class={cn("cn-sidebar-menu-badge", className)}
	{...rest}
>
	{@render children?.()}
</div>
