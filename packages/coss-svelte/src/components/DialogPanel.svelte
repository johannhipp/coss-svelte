<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<div data-slot="dialog-panel" class={cn("cn-dialog-panel", className)} {...rest}>
	{@render children?.()}
</div>
