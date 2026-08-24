<script lang="ts">
import type { HTMLTdAttributes } from "svelte/elements";
import Block from "../internal/Block.svelte";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

type Props = NativeProps & Pick<HTMLTdAttributes, "colspan" | "rowspan" | "headers">;

let { class: className = "", children, ...rest }: Props = $props();
</script>

<Block
	as="td"
	dataSlot="table-cell"
	class={cn("cn-table-cell", className)}
	{...rest}
>
	{@render children?.()}
</Block>
