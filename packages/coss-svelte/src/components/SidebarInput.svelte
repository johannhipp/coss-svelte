<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", ...rest }: NativeProps = $props();
</script>

<input
	data-slot="sidebar-input"
	data-sidebar="input"
	class={cn("cn-sidebar-input", className)}
	{...rest}
/>
