<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block
	as="div"
	dataSlot="alert"
	class={cn("cn-alert", className)}
	{...rest}
>
	{@render children?.()}
</Block>
