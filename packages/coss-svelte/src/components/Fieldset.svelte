<script>
import { cn } from "../utils.js";

let { legend = "", description = "", class: className = "", children, ...rest } = $props();
</script>

<fieldset data-slot="fieldset" class={cn("cn-fieldset", className)} {...rest}>
	{#if legend}
		<legend class="cn-fieldset-legend">{legend}</legend>
	{/if}
	{#if description}
		<p class="cn-fieldset-description">{description}</p>
	{/if}
	{@render children?.()}
</fieldset>
