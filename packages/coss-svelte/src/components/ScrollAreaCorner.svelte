<script lang="ts">
import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<ScrollAreaPrimitive.Corner
	data-slot="scroll-area-corner"
	class={cn("cn-scroll-area-corner", className)}
	{...rest}
>
	{@render children?.()}
</ScrollAreaPrimitive.Corner>
