<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<main data-slot="sidebar-inset" class={cn("cn-sidebar-inset", className)} {...rest}>
	{@render children?.()}
</main>
