<script lang="ts">
import type { Snippet } from "svelte";
import Block from "../internal/Block.svelte";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

type Props = NativeProps & {
	align?: "inline-start" | "inline-end" | "block-start" | "block-end" | "center";
	children?: Snippet;
};

let { align = "inline-start", class: className = "", children, ...rest }: Props = $props();
</script>

<Block
	as="div"
	dataSlot="input-group-addon"
	data-align={align}
	class={cn("cn-input-group-addon", className)}
	{...rest}
>
	{@render children?.()}
</Block>
