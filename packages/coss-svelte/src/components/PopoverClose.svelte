<script lang="ts">
import { Popover as PopoverPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<PopoverPrimitive.Close
	data-slot="popover-close"
	class={cn("cn-popover-close", className)}
	{...rest}
>
	{@render children?.()}
</PopoverPrimitive.Close>
