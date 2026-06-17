<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<span data-slot="meter-track" class={cn("cn-meter-track", className)} {...rest}>
	{@render children?.()}
</span>
