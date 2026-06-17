<script>
import { Dialog as DialogPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.Close
	data-slot="dialog-close"
	class={cn("cn-dialog-close", className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Close>
