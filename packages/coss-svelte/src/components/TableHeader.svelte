<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="thead"
	dataSlot="table-header"
	class={cn("cn-table-header", className)}
	{...rest}
>
	{@render children?.()}
</Block>
