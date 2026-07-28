<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof CommandPrimitive.Separator>, "child">;

let {
	ref = $bindable(null),
	class: className = "",
	children = undefined,
	...rest
}: Props = $props();
</script>

<CommandPrimitive.Separator
	bind:ref
	data-slot="command-separator"
	class={cn("cn-command-separator", className)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Separator>
