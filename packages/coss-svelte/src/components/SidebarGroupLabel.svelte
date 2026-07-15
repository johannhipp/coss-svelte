<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<div
	data-slot="sidebar-group-label"
	data-sidebar="group-label"
	class={cn("cn-sidebar-group-label", className)}
	{...rest}
>
	{@render children?.()}
</div>
