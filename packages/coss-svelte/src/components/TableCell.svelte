<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="td"
	dataSlot="table-cell"
	class={cn("cn-table-cell", className)}
	{...rest}
>
	{@render children?.()}
</Block>
