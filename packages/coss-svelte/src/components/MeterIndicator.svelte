<script>
import { cn } from "../utils.js";

let { class: className = "", ...rest } = $props();
</script>

<span data-slot="meter-indicator" class={cn("cn-meter-indicator", className)} {...rest}></span>
