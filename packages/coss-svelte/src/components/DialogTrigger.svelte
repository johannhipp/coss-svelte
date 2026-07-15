<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<DialogPrimitive.Trigger
	data-slot="dialog-trigger"
	class={cn("cn-dialog-trigger", className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Trigger>
