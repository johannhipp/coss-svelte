<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", ...rest }: NativeProps = $props();
</script>

<div
	data-slot="sidebar-separator"
	data-sidebar="separator"
	class={cn("cn-sidebar-separator", className)}
	role="separator"
	{...rest}
></div>
