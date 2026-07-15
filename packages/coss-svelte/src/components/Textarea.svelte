<script lang="ts">
import type { HTMLTextareaAttributes } from "svelte/elements";
import { getFieldContext } from "../internal/field-context.svelte.js";
import { cn } from "../utils.js";

let {
	id,
	required,
	disabled,
	"aria-describedby": ariaDescribedBy,
	"aria-invalid": ariaInvalid,
	class: className = "",
	...rest
}: HTMLTextareaAttributes = $props();
const field = getFieldContext();
let controlId = $derived(id ?? field?.controlId);
let describedBy = $derived(
	[ariaDescribedBy, field?.describedBy].filter(Boolean).join(" ") || undefined
);
let isInvalid = $derived(ariaInvalid ?? (field?.invalid ? "true" : undefined));
</script>

<textarea data-slot="textarea" id={controlId} class={cn("cn-textarea", className)} required={required ?? field?.required} disabled={disabled ?? field?.disabled} aria-describedby={describedBy} aria-invalid={isInvalid} data-invalid={field?.invalid ? "true" : undefined} {...rest}></textarea>
