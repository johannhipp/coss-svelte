<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<span data-slot="meter-label" class={cn("cn-meter-label", className)} {...rest}>
	{@render children?.()}
</span>
