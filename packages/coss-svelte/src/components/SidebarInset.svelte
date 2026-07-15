<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<main data-slot="sidebar-inset" class={cn("cn-sidebar-inset", className)} {...rest}>
	{@render children?.()}
</main>
