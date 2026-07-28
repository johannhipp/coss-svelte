<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof CommandPrimitive.GroupHeading>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<CommandPrimitive.GroupHeading
	bind:ref
	data-slot="command-group-label"
	class={cn("cn-command-group-label", className)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.GroupHeading>
