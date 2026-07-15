<script lang="ts">
import Block from "../internal/Block.svelte";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<Block
	as="h3"
	dataSlot="empty-title"
	class={cn("cn-empty-title", className)}
	{...rest}
>
	{@render children?.()}
</Block>
