<script>
import { Dialog as DialogPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.Description
	data-slot="dialog-description"
	class={cn("cn-dialog-description", className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Description>
