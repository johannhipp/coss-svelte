<script>
import { cn } from "../utils.js";

let { variant = "neutral", class: className = "", children, ...rest } = $props();
</script>

<span data-slot="badge" class={cn("cn-badge", `cn-badge-${variant}`, className)} {...rest}>
	{@render children?.()}
</span>
