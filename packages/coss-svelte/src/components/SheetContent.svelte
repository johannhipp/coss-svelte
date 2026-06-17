<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="div"
	dataSlot="sheet-content"
	class={cn("cn-sheet-content", className)}
	{...rest}
>
	{@render children?.()}
</Block>
