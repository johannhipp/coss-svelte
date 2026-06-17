<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="button"
	dataSlot="combobox-clear"
	class={cn("cn-combobox-clear", className)}
	{...rest}
>
	{@render children?.()}
</Block>
