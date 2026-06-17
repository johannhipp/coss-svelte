<script>
import { cn } from "../utils.js";

let { label = "", class: className = "", children, ...rest } = $props();
</script>

<fieldset data-slot="checkbox-group" class={cn("cn-choice-group", className)} {...rest}>
	{#if label}
		<legend>{label}</legend>
	{/if}
	<div class="cn-choice-stack">
		{@render children?.()}
	</div>
</fieldset>
