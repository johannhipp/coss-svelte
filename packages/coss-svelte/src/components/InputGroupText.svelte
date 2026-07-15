<script lang="ts">
import Block from "../internal/Block.svelte";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<Block as="span" dataSlot="input-group-text" class={cn("cn-input-group-text", className)} {...rest}>
	{@render children?.()}
</Block>
