<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="footer"
	dataSlot="command-footer"
	class={cn("cn-command-footer", className)}
	{...rest}
>
	{@render children?.()}
</Block>
