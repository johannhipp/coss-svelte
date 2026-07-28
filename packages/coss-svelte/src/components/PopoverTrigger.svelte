<script lang="ts">
import { Popover as PopoverPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof PopoverPrimitive.Trigger>;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<PopoverPrimitive.Trigger
	bind:ref
	data-slot="popover-trigger"
	class={cn("cn-popover-trigger", className)}
	{...rest}
>
	{@render children?.()}
</PopoverPrimitive.Trigger>
