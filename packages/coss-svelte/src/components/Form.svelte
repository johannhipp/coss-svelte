<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<form data-slot="form" class={cn("cn-form", className)} {...rest}>
	{@render children?.()}
</form>
