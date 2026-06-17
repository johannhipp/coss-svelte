<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="p"
	dataSlot="field-validity"
	class={cn("cn-field-validity", className)}
	{...rest}
>
	{@render children?.()}
</Block>
