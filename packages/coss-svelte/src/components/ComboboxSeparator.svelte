<script>
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ComboboxPrimitive.Separator
	data-slot="combobox-separator"
	class={cn("cn-combobox-separator", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.Separator>
