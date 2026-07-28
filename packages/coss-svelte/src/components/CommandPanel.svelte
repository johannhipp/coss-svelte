<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof CommandPrimitive.Viewport>, "child">;

let {
	ref = $bindable(null),
	class: className = "",
	children = undefined,
	...rest
}: Props = $props();
</script>

<CommandPrimitive.Viewport
	bind:ref
	data-slot="command-panel"
	class={cn("cn-command-panel", className)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Viewport>
