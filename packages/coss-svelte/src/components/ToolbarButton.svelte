<script lang="ts">
import { Toolbar as ToolbarPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<ToolbarPrimitive.Button
	data-slot="toolbar-button"
	class={cn("cn-toolbar-button", className)}
	{...rest}
>
	{@render children?.()}
</ToolbarPrimitive.Button>
