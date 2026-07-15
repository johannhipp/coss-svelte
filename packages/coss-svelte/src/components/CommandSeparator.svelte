<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children = undefined, ...rest }: NativeProps = $props();
</script>

<CommandPrimitive.Separator
	data-slot="command-separator"
	class={cn("cn-command-separator", className)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Separator>
