<script>
import { cn } from "../utils.js";

let { class: className = "", ...rest } = $props();
</script>

<textarea data-slot="input-group-textarea" class={cn("cn-input-group-textarea", className)} {...rest}></textarea>
