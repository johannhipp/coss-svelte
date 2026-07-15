<script lang="ts">
import Block from "../internal/Block.svelte";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<Block
	as="div"
	dataSlot="empty-media"
	class={cn("cn-empty-media", className)}
	{...rest}
>
	{@render children?.()}
</Block>
