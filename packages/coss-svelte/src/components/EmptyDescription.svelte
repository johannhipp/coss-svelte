<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="p"
	dataSlot="empty-description"
	class={cn("cn-empty-description", className)}
	{...rest}
>
	{@render children?.()}
</Block>
