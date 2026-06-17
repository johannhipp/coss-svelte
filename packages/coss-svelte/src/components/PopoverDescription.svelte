<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<p data-slot="popover-description" class={cn("cn-popover-description", className)} {...rest}>
	{@render children?.()}
</p>
