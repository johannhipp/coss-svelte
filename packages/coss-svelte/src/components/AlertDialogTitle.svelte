<script>
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<AlertDialogPrimitive.Title
	data-slot="alert-dialog-title"
	class={cn("cn-dialog-title", className)}
	{...rest}
>
	{@render children?.()}
</AlertDialogPrimitive.Title>
