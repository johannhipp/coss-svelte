<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="header"
	dataSlot="empty-header"
	class={cn("cn-empty-header", className)}
	{...rest}
>
	{@render children?.()}
</Block>
