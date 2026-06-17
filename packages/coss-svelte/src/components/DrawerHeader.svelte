<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="header"
	dataSlot="drawer-header"
	class={cn("cn-drawer-header", className)}
	{...rest}
>
	{@render children?.()}
</Block>
