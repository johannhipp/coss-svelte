<script>
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<AlertDialogPrimitive.Description
	data-slot="alert-dialog-description"
	class={cn("cn-dialog-description", className)}
	{...rest}
>
	{@render children?.()}
</AlertDialogPrimitive.Description>
