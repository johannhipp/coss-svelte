<script>
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ComboboxPrimitive.Item
	data-slot="autocomplete-item"
	class={cn("cn-autocomplete-item", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.Item>
