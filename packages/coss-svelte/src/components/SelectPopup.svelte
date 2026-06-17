<script>
import { Select as SelectPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<SelectPrimitive.Portal>
	<SelectPrimitive.Content data-slot="select-popup" class={cn("cn-select-popup", className)} {...rest}>
		{@render children?.()}
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>
