<script>
import { Dialog as DialogPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.Portal>
	<DialogPrimitive.Overlay data-slot="command-dialog-overlay" class="cn-dialog-overlay" />
	<DialogPrimitive.Content
		data-slot="command-dialog-popup"
		class={cn("cn-dialog cn-command-dialog-popup", className)}
		{...rest}
	>
		{@render children?.()}
	</DialogPrimitive.Content>
</DialogPrimitive.Portal>
