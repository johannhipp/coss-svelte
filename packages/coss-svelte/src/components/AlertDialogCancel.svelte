<script>
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<AlertDialogPrimitive.Cancel
	data-slot="alert-dialog-cancel"
	class={cn("cn-alert-dialog-cancel", className)}
	{...rest}
>
	{@render children?.()}
</AlertDialogPrimitive.Cancel>
