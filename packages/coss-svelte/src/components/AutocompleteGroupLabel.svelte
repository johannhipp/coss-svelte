<script>
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ComboboxPrimitive.GroupHeading
	data-slot="autocomplete-group-label"
	class={cn("cn-autocomplete-group-label", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.GroupHeading>
