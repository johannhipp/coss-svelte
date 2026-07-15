<script lang="ts">
import Block from "../internal/Block.svelte";
import { getFieldContext } from "../internal/field-context.svelte.js";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
const field = getFieldContext();
const unregister = field?.registerDescription(field?.descriptionId);
$effect(() => unregister);
</script>

<Block
	as="p"
	dataSlot="field-description"
	id={field?.descriptionId}
	class={cn("cn-field-description", className)}
	{...rest}
>
	{@render children?.()}
</Block>
