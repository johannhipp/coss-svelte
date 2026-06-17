<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<span data-slot="meter-value" class={cn("cn-meter-value", className)} {...rest}>
	{@render children?.()}
</span>
