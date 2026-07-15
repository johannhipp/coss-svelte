<script lang="ts">
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<AlertDialogPrimitive.Cancel
	data-slot="alert-dialog-cancel"
	class={cn("cn-alert-dialog-cancel", className)}
	{...rest}
>
	{@render children?.()}
</AlertDialogPrimitive.Cancel>
