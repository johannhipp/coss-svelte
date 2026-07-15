<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children = undefined, ...rest }: NativeProps = $props();
</script>

<CommandPrimitive.Viewport
	data-slot="command-panel"
	class={cn("cn-command-panel", className)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.Viewport>
