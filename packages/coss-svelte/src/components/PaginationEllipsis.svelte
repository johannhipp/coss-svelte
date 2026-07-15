<script lang="ts">
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", ...rest }: NativeProps = $props();
</script>

<span data-slot="pagination-ellipsis" class={cn("cn-pagination-ellipsis", className)} aria-hidden="true" {...rest}>
	...
	<span class="sr-only">More pages</span>
</span>
