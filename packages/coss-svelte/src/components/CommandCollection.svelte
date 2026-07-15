<script lang="ts">
import { Command as CommandPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<CommandPrimitive.GroupItems
	data-slot="command-collection"
	class={cn("cn-command-collection", className)}
	{...rest}
>
	{@render children?.()}
</CommandPrimitive.GroupItems>
