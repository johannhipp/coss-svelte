<script lang="ts">
import Block from "../internal/Block.svelte";
import { getFieldContext } from "../internal/field-context.svelte.js";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
const field = getFieldContext();
</script>

<Block
	as="p"
	dataSlot="field-validity"
	id={field?.validityId}
	class={cn("cn-field-validity", className)}
	{...rest}
>
	{@render children?.()}
</Block>
