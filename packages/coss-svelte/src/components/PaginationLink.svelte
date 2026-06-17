<script>
import { cn } from "../utils.js";

let { class: className = "", isActive = false, children, ...rest } = $props();
</script>

<a
	data-slot="pagination-link"
	data-active={isActive ? "true" : undefined}
	aria-current={isActive ? "page" : undefined}
	class={cn("cn-pagination-button", className)}
	{...rest}
>
	{@render children?.()}
</a>
