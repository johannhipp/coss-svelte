<script>
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ComboboxPrimitive.Viewport
	data-slot="combobox-list"
	class={cn("cn-combobox-list", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.Viewport>
