<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="div"
	dataSlot="combobox-empty"
	class={cn("cn-combobox-empty", className)}
	{...rest}
>
	{@render children?.()}
</Block>
