<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<CommandPrimitive.GroupHeading
	data-slot="command-group-label"
	class={cn("cn-command-group-label", className)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.GroupHeading>
