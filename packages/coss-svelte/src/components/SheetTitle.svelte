<script>
import { Dialog as DialogPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<DialogPrimitive.Title
	data-slot="sheet-title"
	class={cn("cn-sheet-title", className)}
	{...rest}
>
	{@render children?.()}
</DialogPrimitive.Title>
