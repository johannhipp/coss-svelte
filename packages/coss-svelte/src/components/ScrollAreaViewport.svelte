<script lang="ts">
import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<ScrollAreaPrimitive.Viewport
	data-slot="scroll-area-viewport"
	class={cn("cn-scroll-area-viewport", className)}
	{...rest}
>
	{@render children?.()}
</ScrollAreaPrimitive.Viewport>
