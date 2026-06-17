<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="footer"
	dataSlot="drawer-footer"
	class={cn("cn-drawer-footer", className)}
	{...rest}
>
	{@render children?.()}
</Block>
