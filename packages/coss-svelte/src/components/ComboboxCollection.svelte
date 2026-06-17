<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="div"
	dataSlot="combobox-collection"
	class={cn("cn-combobox-collection", className)}
	{...rest}
>
	{@render children?.()}
</Block>
