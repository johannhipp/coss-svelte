<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="h3"
	dataSlot="frame-title"
	class={cn("cn-frame-title", className)}
	{...rest}
>
	{@render children?.()}
</Block>
