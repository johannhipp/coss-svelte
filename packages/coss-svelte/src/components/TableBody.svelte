<script lang="ts">
import Block from "../internal/Block.svelte";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<Block
	as="tbody"
	dataSlot="table-body"
	class={cn("cn-table-body", className)}
	{...rest}
>
	{@render children?.()}
</Block>
