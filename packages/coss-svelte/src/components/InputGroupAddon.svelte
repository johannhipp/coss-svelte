<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { align = "inline-start", class: className = "", children, ...rest } = $props();
</script>

<Block
	as="div"
	dataSlot="input-group-addon"
	data-align={align}
	class={cn("cn-input-group-addon", className)}
	{...rest}
>
	{@render children?.()}
</Block>
