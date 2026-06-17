<script>
import { Separator as SeparatorPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { orientation = "horizontal", class: className = "", children, ...rest } = $props();
</script>

<SeparatorPrimitive.Root
	data-slot="separator"
	class={cn("cn-separator", `cn-separator-${orientation}`, className)}
	{orientation}
	{...rest}
>
	{@render children?.()}
</SeparatorPrimitive.Root>
