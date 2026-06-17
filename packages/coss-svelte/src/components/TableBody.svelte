<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="tbody"
	dataSlot="table-body"
	class={cn("cn-table-body", className)}
	{...rest}
>
	{@render children?.()}
</Block>
