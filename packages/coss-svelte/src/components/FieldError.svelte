<script lang="ts">
import { untrack } from "svelte";
import { getFieldContext } from "../internal/field-context.svelte.js";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { id, class: className = "", children, ...rest }: NativeProps = $props();
const field = getFieldContext();
const resolvedId = $derived(id ?? field?.errorId);
// Register during initialization so server-rendered controls can reference the message.
// svelte-ignore state_referenced_locally
let unregister = field?.registerError(resolvedId);
$effect(() => {
	const currentId = resolvedId;
	untrack(() => {
		unregister?.();
		unregister = field?.registerError(currentId);
	});
	return () => untrack(() => unregister?.());
});
</script>

<p data-slot="field-error" id={resolvedId} class={cn("cn-field-error", className)} role="alert" {...rest}>
	{@render children?.()}
</p>
