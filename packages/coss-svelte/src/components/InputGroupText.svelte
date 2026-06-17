<script>
import Block from "../internal/Block.svelte";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<Block as="span" dataSlot="input-group-text" class={cn("cn-input-group-text", className)} {...rest}>
	{@render children?.()}
</Block>
