<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof CollapsiblePrimitive.Trigger>;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<CollapsiblePrimitive.Trigger
	bind:ref
	data-slot="collapsible-trigger"
	class={cn("cn-collapsible-trigger", className)}
	{...rest}
>
	{@render children?.()}
</CollapsiblePrimitive.Trigger>
