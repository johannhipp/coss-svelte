<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<h2 data-slot="popover-title" class={cn("cn-popover-title", className)} {...rest}>
	{@render children?.()}
</h2>
