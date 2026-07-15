<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<div
	data-slot="sidebar-footer"
	data-sidebar="footer"
	class={cn("cn-sidebar-footer", className)}
	{...rest}
>
	{@render children?.()}
</div>
