<script lang="ts">
import { Toolbar as ToolbarPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type GroupProps = ComponentProps<typeof ToolbarPrimitive.Group>;
type Props = Omit<GroupProps, "children" | "type" | "value"> & {
	type?: "single" | "multiple";
	value?: string | string[];
	class?: string;
	children?: Snippet;
};

let {
	type = "single",
	value = $bindable(),
	class: className = "",
	children,
	...rest
}: Props = $props();
</script>

<ToolbarPrimitive.Group
	data-slot="toolbar-group"
	class={cn("cn-toolbar-group", className)}
	{type}
	bind:value
	{...rest}
>
	{@render children?.()}
</ToolbarPrimitive.Group>
