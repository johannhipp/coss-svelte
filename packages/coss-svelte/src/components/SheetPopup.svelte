<script>
import { Dialog as DialogPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { side = "right", class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.Portal>
	<DialogPrimitive.Overlay data-slot="sheet-overlay" class="cn-dialog-overlay" />
	<DialogPrimitive.Content
		data-slot="sheet-popup"
		data-side={side}
		class={cn("cn-sheet", `cn-sheet-${side}`, className)}
		{...rest}
	>
		{@render children?.()}
	</DialogPrimitive.Content>
</DialogPrimitive.Portal>
