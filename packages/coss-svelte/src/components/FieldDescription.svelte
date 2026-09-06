<script lang="ts">
import { untrack } from "svelte";
import Block from "../internal/Block.svelte";
import { getFieldContext } from "../internal/field-context.svelte.js";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { id, class: className = "", children, ...rest }: NativeProps = $props();
const field = getFieldContext();
const resolvedId = $derived(id ?? field?.descriptionId);
// Register during initialization so server-rendered controls can reference the message.
// svelte-ignore state_referenced_locally
let unregister = field?.registerDescription(resolvedId);
$effect(() => {
	const currentId = resolvedId;
	untrack(() => {
		unregister?.();
		unregister = field?.registerDescription(currentId);
	});
	return () => untrack(() => unregister?.());
});
</script>

<Block
	as="p"
	dataSlot="field-description"
	id={resolvedId}
	class={cn("cn-field-description", className)}
	{...rest}
>
	{@render children?.()}
</Block>
