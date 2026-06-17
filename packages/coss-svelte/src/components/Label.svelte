<script>
import { Label as LabelPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<LabelPrimitive.Root data-slot="label" class={cn("cn-label", className)} {...rest}>
	{@render children?.()}
</LabelPrimitive.Root>
