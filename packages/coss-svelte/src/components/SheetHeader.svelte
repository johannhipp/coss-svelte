<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="header"
	dataSlot="sheet-header"
	class={cn("cn-sheet-header", className)}
	{...rest}
>
	{@render children?.()}
</Block>
