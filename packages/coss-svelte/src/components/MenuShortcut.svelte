<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="span"
	dataSlot="menu-shortcut"
	class={cn("cn-menu-shortcut", className)}
	{...rest}
>
	{@render children?.()}
</Block>
