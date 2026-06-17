<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="header"
	dataSlot="card-header"
	class={cn("cn-card-header", className)}
	{...rest}
>
	{@render children?.()}
</Block>
