<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.RadioGroup>, "child">;
let {
	ref = $bindable(null),
	value = $bindable(""),
	class: className = "",
	children,
	...rest
}: Props = $props();
</script>

<ContextMenuPrimitive.RadioGroup
	{...rest}
	bind:ref
	bind:value
	data-slot="context-menu-radio-group"
	class={cn("cn-menu-radio-group", className)}
>
	{@render children?.()}
</ContextMenuPrimitive.RadioGroup>
