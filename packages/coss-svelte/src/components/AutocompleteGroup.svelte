<script>
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ComboboxPrimitive.Group
	data-slot="autocomplete-group"
	class={cn("cn-autocomplete-group", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.Group>
