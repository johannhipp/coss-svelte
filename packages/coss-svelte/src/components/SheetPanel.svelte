<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="div"
	dataSlot="sheet-panel"
	class={cn("cn-sheet-panel", className)}
	{...rest}
>
	{@render children?.()}
</Block>
