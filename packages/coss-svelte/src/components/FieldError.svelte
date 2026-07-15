<script lang="ts">
import { getFieldContext } from "../internal/field-context.svelte.js";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
const field = getFieldContext();
const unregister = field?.registerError(field?.errorId);
$effect(() => unregister);
</script>

<p data-slot="field-error" id={field?.errorId} class={cn("cn-field-error", className)} role="alert" {...rest}>
	{@render children?.()}
</p>
