<script lang="ts">
import Block from "../internal/Block.svelte";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<Block
	as="div"
	dataSlot="autocomplete-collection"
	class={cn("cn-autocomplete-collection", className)}
	{...rest}
>
	{@render children?.()}
</Block>
