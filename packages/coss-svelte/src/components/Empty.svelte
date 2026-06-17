<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="div"
	dataSlot="empty"
	class={cn("cn-empty", className)}
	{...rest}
>
	{@render children?.()}
</Block>
