<script lang="ts">
import Block from "../internal/Block.svelte";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<Block
	as="header"
	dataSlot="drawer-header"
	class={cn("cn-drawer-header", className)}
	{...rest}
>
	{@render children?.()}
</Block>
