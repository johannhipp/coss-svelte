<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<div data-slot="alert-dialog-header" class={cn("cn-alert-dialog-header", className)} {...rest}>
	{@render children?.()}
</div>
