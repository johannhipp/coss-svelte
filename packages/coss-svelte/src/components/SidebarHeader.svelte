<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<div
	data-slot="sidebar-header"
	data-sidebar="header"
	class={cn("cn-sidebar-header", className)}
	{...rest}
>
	{@render children?.()}
</div>
