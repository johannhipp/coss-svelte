<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<SelectPrimitive.Viewport
	data-slot="select-viewport"
	class={cn("cn-select-viewport", className)}
	{...rest}
>
	{@render children?.()}
</SelectPrimitive.Viewport>
