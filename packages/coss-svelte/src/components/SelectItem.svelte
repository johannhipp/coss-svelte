<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof SelectPrimitive.Item>, "children" | "child"> & {
	children?: Snippet;
};
let { value, class: className = "", children, ...rest }: Props = $props();
</script>

<SelectPrimitive.Item
	data-slot="select-item"
	class={cn("cn-select-item", className)}
	{value}
	{...rest}
>
	{@render children?.()}
</SelectPrimitive.Item>
