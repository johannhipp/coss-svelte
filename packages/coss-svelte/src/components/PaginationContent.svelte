<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ul data-slot="pagination-content" class={cn("cn-pagination-content", className)} {...rest}>
	{@render children?.()}
</ul>
