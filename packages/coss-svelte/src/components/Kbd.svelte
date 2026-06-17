<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<kbd data-slot="kbd" class={cn("cn-kbd", className)} {...rest}>
	{@render children?.()}
</kbd>
