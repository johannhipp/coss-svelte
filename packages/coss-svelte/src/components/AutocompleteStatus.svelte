<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="div"
	dataSlot="autocomplete-status"
	class={cn("cn-autocomplete-status", className)}
	{...rest}
>
	{@render children?.()}
</Block>
