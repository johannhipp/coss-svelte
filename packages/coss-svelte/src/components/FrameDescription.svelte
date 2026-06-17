<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="p"
	dataSlot="frame-description"
	class={cn("cn-frame-description", className)}
	{...rest}
>
	{@render children?.()}
</Block>
