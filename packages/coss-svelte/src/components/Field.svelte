<script lang="ts">
import { createFieldContext, setFieldContext } from "../internal/field-context.svelte.js";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let {
	label = "",
	description = "",
	error = "",
	required = false,
	disabled = false,
	invalid = Boolean(error),
	id,
	class: className = "",
	children,
	...rest
}: NativeProps & {
	label?: string;
	description?: string;
	error?: string;
	required?: boolean;
	disabled?: boolean;
	invalid?: boolean;
} = $props();

const generatedId = $props.id();
const fieldId = $derived(id ?? generatedId);
// The context is created once so its generated IDs remain stable across hydration.
// svelte-ignore state_referenced_locally
const field = createFieldContext(fieldId, {
	required: () => required,
	disabled: () => disabled,
	invalid: () => invalid,
	description: () => Boolean(description),
	error: () => Boolean(error),
});
setFieldContext(field);
</script>

<div
	data-slot="field"
	data-invalid={field.invalid ? "true" : undefined}
	data-disabled={field.disabled ? "true" : undefined}
	class={cn("cn-field", className)}
	{...rest}
>
	{#if label}
		<div class="cn-field-label-row">
			<label class="cn-label" for={field.controlId} id={field.labelId}>{label}</label>
			{#if required}
				<span class="cn-field-required" aria-hidden="true">*</span>
			{/if}
		</div>
	{/if}
	{@render children?.()}
	{#if description}
		<p id={field.descriptionId} class="cn-field-description">{description}</p>
	{/if}
	{#if error}
		<p id={field.errorId} class="cn-field-error" role="alert">{error}</p>
	{/if}
</div>
