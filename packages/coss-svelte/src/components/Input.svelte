<script>
import { cn } from "../utils.js";

let { type = "text", value = $bindable(), class: className = "", ...rest } = $props();
</script>

<input data-slot="input" class={cn("cn-input", className)} {type} bind:value {...rest} />
