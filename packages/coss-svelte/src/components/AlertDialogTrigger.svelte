<script lang="ts">
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<AlertDialogPrimitive.Trigger
	data-slot="alert-dialog-trigger"
	class={cn("cn-alert-dialog-trigger", className)}
	{...rest}
>
	{@render children?.()}
</AlertDialogPrimitive.Trigger>
