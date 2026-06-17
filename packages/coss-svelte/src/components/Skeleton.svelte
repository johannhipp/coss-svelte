<script>
import { cn } from "../utils.js";

let { class: className = "", ...rest } = $props();
</script>

<div data-slot="skeleton" class={cn("cn-skeleton", className)} aria-hidden="true" {...rest}></div>
