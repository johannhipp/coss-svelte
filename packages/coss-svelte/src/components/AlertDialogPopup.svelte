<script>
import { AlertDialog as AlertDialogPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<AlertDialogPrimitive.Portal>
	<AlertDialogPrimitive.Overlay data-slot="alert-dialog-overlay" class="cn-dialog-overlay" />
	<AlertDialogPrimitive.Content
		data-slot="alert-dialog-popup"
		class={cn("cn-dialog cn-alert-dialog", className)}
		{...rest}
	>
		{@render children?.()}
	</AlertDialogPrimitive.Content>
</AlertDialogPrimitive.Portal>
