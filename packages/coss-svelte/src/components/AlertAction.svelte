<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<div data-slot="alert-action" class={cn("cn-alert-action", className)} {...rest}>
	{@render children?.()}
</div>
