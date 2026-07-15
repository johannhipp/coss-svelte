<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<ul data-slot="pagination-content" class={cn("cn-pagination-content", className)} {...rest}>
	{@render children?.()}
</ul>
