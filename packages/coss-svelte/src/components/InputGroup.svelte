<script lang="ts">
import Block from "../internal/Block.svelte";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<Block
	as="div"
	dataSlot="input-group"
	class={cn("cn-input-group", className)}
	{...rest}
>
	{@render children?.()}
</Block>
