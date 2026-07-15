<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<DialogPrimitive.Trigger
	data-slot="drawer-trigger"
	class={cn("cn-drawer-trigger", className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Trigger>
