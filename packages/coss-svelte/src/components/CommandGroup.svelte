<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof CommandPrimitive.Group>, "child">;

let {
	ref = $bindable(null),
	class: className = "",
	children,
	forceMount,
	...rest
}: Props = $props();
</script>

<CommandPrimitive.Group
	bind:ref
	data-slot="command-group"
	class={cn("cn-command-group", className)}
	{forceMount}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Group>
