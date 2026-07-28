<script lang="ts">
import { Popover as PopoverPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof PopoverPrimitive.Close>;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<PopoverPrimitive.Close
	bind:ref
	data-slot="popover-close"
	class={cn("cn-popover-close", className)}
	{...rest}
>
	{@render children?.()}
</PopoverPrimitive.Close>
