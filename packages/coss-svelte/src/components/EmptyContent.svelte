<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="div"
	dataSlot="empty-content"
	class={cn("cn-empty-content", className)}
	{...rest}
>
	{@render children?.()}
</Block>
