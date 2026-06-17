<script>
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ComboboxPrimitive.Separator
	data-slot="autocomplete-separator"
	class={cn("cn-autocomplete-separator", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.Separator>
