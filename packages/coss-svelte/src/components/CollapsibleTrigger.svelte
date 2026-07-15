<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<CollapsiblePrimitive.Trigger
	data-slot="collapsible-trigger"
	class={cn("cn-collapsible-trigger", className)}
	{...rest}
>
	{@render children?.()}
</CollapsiblePrimitive.Trigger>
