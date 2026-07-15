<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<ul data-slot="sidebar-menu" data-sidebar="menu" class={cn("cn-sidebar-menu", className)} {...rest}>
	{@render children?.()}
</ul>
