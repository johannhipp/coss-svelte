<script>
import { Dialog as DialogPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.Title
	data-slot="dialog-title"
	class={cn("cn-dialog-title", className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Title>
