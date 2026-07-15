<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<h2 data-slot="popover-title" class={cn("cn-popover-title", className)} {...rest}>
	{@render children?.()}
</h2>
