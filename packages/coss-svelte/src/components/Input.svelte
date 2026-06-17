<script>
import { cn } from "../utils.js";

let { type = "text", class: className = "", ...rest } = $props();
</script>

<input data-slot="input" class={cn("cn-input", className)} {type} {...rest} />
