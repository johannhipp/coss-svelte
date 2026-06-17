<script>
import { cn } from "../utils.js";

let {
	label = "",
	description = "",
	error = "",
	required = false,
	class: className = "",
	children,
	...rest
} = $props();
</script>

<div
	data-slot="field"
	data-invalid={error ? "true" : undefined}
	class={cn("cn-field", className)}
	{...rest}
>
	{#if label}
		<div class="cn-field-label-row">
			<span class="cn-label">{label}</span>
			{#if required}
				<span class="cn-field-required" aria-hidden="true">*</span>
			{/if}
		</div>
	{/if}
	{@render children?.()}
	{#if description}
		<p class="cn-field-description">{description}</p>
	{/if}
	{#if error}
		<p class="cn-field-error">{error}</p>
	{/if}
</div>
