<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof CommandPrimitive.GroupItems>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<CommandPrimitive.GroupItems
	bind:ref
	data-slot="command-collection"
	class={cn("cn-command-collection", className)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.GroupItems>
