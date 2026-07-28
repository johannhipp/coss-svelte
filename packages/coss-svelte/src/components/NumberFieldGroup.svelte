<script lang="ts">
import { getNumberFieldContext } from "../internal/number-field-context.svelte.js";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
const state = getNumberFieldContext();
</script>

<div
	data-slot="number-field-group"
	data-size={state.size}
	data-disabled={state.disabled ? "" : undefined}
	data-readonly={state.readonly ? "" : undefined}
	data-invalid={state.invalid ? "" : undefined}
	aria-disabled={state.disabled ? "true" : undefined}
	class={cn("cn-number-field-group", className)}
	{...rest}
>
	{@render children?.()}
</div>
