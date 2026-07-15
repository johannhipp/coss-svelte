<script lang="ts">
import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ToggleGroupPrimitive.Item>, "children" | "child"> & {
	children?: Snippet;
};
let { value, class: className = "", children, ...rest }: Props = $props();
</script>

<ToggleGroupPrimitive.Item
	data-slot="toggle-group-item"
	class={cn("cn-toggle-group-item", className)}
	{value}
	{...rest}
>
	{@render children?.()}
</ToggleGroupPrimitive.Item>
