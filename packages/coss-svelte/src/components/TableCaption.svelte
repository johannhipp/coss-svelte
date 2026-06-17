<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="caption"
	dataSlot="table-caption"
	class={cn("cn-table-caption", className)}
	{...rest}
>
	{@render children?.()}
</Block>
