<script>
import { cn } from "../utils.js";

let { label = "Loading", class: className = "", ...rest } = $props();
</script>

<span data-slot="spinner" class={cn("cn-spinner", className)} role="status" {...rest}>
	<span class="cn-sr-only">{label}</span>
</span>
