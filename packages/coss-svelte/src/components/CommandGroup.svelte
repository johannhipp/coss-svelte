<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let {
	class: className = "",
	children,
	forceMount,
	...rest
}: NativeProps & {
	forceMount?: boolean;
} = $props();
</script>

<CommandPrimitive.Group
	data-slot="command-group"
	class={cn("cn-command-group", className)}
	{forceMount}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Group>
