<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<div data-slot="alert-dialog-footer" class={cn("cn-alert-dialog-footer", className)} {...rest}>
	{@render children?.()}
</div>
