<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="h3"
	dataSlot="alert-title"
	class={cn("cn-alert-title", className)}
	{...rest}
>
	{@render children?.()}
</Block>
