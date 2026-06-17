<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="tr"
	dataSlot="table-row"
	class={cn("cn-table-row", className)}
	{...rest}
>
	{@render children?.()}
</Block>
