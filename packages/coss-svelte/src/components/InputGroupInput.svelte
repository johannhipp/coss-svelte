<script>
import { cn } from "../utils.js";

let { type = "text", class: className = "", ...rest } = $props();
</script>

<input data-slot="input-group-input" class={cn("cn-input-group-input", className)} {type} {...rest} />
