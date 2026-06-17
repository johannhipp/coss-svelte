<script>
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<p data-slot="field-error" class={cn("cn-field-error", className)} role="alert" {...rest}>
	{@render children?.()}
</p>
