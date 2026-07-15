<script lang="ts">
import { Toolbar as ToolbarPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<ToolbarPrimitive.Link
	data-slot="toolbar-link"
	class={cn("cn-toolbar-link", className)}
	{...rest}
>
	{@render children?.()}
</ToolbarPrimitive.Link>
