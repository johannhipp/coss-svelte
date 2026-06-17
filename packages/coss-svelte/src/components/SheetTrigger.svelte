<script>
import { Dialog as DialogPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.Trigger
	data-slot="sheet-trigger"
	class={cn("cn-sheet-trigger", className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Trigger>
