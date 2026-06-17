<script>
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<AlertDialogPrimitive.Trigger
	data-slot="alert-dialog-trigger"
	class={cn("cn-alert-dialog-trigger", className)}
	{...rest}
>
	{@render children?.()}
</AlertDialogPrimitive.Trigger>
