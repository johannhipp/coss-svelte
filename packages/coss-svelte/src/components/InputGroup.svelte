<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="div"
	dataSlot="input-group"
	class={cn("cn-input-group", className)}
	{...rest}
>
	{@render children?.()}
</Block>
