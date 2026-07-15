<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<CommandPrimitive.List
	data-slot="command-list"
	class={cn("cn-command-list", className)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.List>
