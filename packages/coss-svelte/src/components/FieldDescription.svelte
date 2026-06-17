<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="p"
	dataSlot="field-description"
	class={cn("cn-field-description", className)}
	{...rest}
>
	{@render children?.()}
</Block>
