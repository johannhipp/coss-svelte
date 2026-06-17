<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="div"
	dataSlot="card-panel"
	class={cn("cn-card-panel", className)}
	{...rest}
>
	{@render children?.()}
</Block>
