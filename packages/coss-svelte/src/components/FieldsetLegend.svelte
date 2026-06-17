<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="legend"
	dataSlot="fieldset-legend"
	class={cn("cn-fieldset-legend", className)}
	{...rest}
>
	{@render children?.()}
</Block>
