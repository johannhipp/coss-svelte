<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";
import { getFieldContext } from "../internal/field-context.svelte.js";
import { cn } from "../utils.js";

let {
	type = "text",
	value = $bindable(),
	id,
	required,
	disabled,
	"aria-describedby": ariaDescribedBy,
	"aria-invalid": ariaInvalid,
	class: className = "",
	...rest
}: HTMLInputAttributes = $props();
const field = getFieldContext();
let controlId = $derived(id ?? field?.controlId);
let describedBy = $derived(
	[ariaDescribedBy, field?.describedBy].filter(Boolean).join(" ") || undefined
);
let isInvalid = $derived(ariaInvalid ?? (field?.invalid ? "true" : undefined));
</script>

<input data-slot="input" id={controlId} class={cn("cn-input", className)} {type} bind:value required={required ?? field?.required} disabled={disabled ?? field?.disabled} aria-describedby={describedBy} aria-invalid={isInvalid} data-invalid={field?.invalid ? "true" : undefined} {...rest} />
