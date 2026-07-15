<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<div
	data-slot="sidebar-content"
	data-sidebar="content"
	class={cn("cn-sidebar-content", className)}
	{...rest}
>
	{@render children?.()}
</div>
