<script>
import { cn } from "../utils.js";

let { class: className = "", ...rest } = $props();
</script>

<textarea data-slot="textarea" class={cn("cn-textarea", className)} {...rest}></textarea>
