<script>
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<AlertDialogPrimitive.Action
	data-slot="alert-dialog-action"
	class={cn("cn-alert-dialog-action", className)}
	{...rest}
>
	{@render children?.()}
</AlertDialogPrimitive.Action>
