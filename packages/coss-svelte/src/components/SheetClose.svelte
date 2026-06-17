<script>
import { Dialog as DialogPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.Close
	data-slot="sheet-close"
	class={cn("cn-sheet-close", className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Close>
