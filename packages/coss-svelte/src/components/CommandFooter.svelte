<script lang="ts">
import Block from "../internal/Block.svelte";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children = undefined, ...rest }: NativeProps = $props();
</script>

<Block
	as="footer"
	dataSlot="command-footer"
	class={cn("cn-command-footer", className)}
	{...rest}
>
	{@render children?.()}
</Block>
