<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<div
	data-slot="sidebar-group"
	data-sidebar="group"
	class={cn("cn-sidebar-group", className)}
	{...rest}
>
	{@render children?.()}
</div>
