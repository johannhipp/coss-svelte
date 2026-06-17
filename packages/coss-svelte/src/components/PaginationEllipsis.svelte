<script>
import { cn } from "../utils.js";

let { class: className = "", ...rest } = $props();
</script>

<span data-slot="pagination-ellipsis" class={cn("cn-pagination-ellipsis", className)} aria-hidden="true" {...rest}>
	...
	<span class="sr-only">More pages</span>
</span>
