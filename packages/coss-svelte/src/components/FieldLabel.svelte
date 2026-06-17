<script>
import { cn } from "../utils.js";

let { required = false, class: className = "", children, ...rest } = $props();
</script>

<label data-slot="field-label" class={cn("cn-field-label", className)} {...rest}>
	<span>{@render children?.()}</span>
	{#if required}
		<span class="cn-field-required" aria-hidden="true">*</span>
	{/if}
</label>
