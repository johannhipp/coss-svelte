<script lang="ts">
import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<ScrollAreaPrimitive.Thumb
	data-slot="scroll-area-thumb"
	class={cn("cn-scroll-area-thumb", className)}
	{...rest}
>
	{@render children?.()}
</ScrollAreaPrimitive.Thumb>
