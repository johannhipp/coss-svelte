<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="div"
	dataSlot="autocomplete-collection"
	class={cn("cn-autocomplete-collection", className)}
	{...rest}
>
	{@render children?.()}
</Block>
