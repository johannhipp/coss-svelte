<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<div data-slot="dialog-footer" class={cn("cn-dialog-footer", className)} {...rest}>
	{@render children?.()}
</div>
