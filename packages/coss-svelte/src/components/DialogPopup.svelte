<script>
import { Dialog as DialogPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.Portal>
	<DialogPrimitive.Overlay data-slot="dialog-overlay" class="cn-dialog-overlay" />
	<DialogPrimitive.Content data-slot="dialog-popup" class={cn("cn-dialog", className)} {...rest}>
		{@render children?.()}
	</DialogPrimitive.Content>
</DialogPrimitive.Portal>
