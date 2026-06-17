<script>
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ComboboxPrimitive.Portal>
	<ComboboxPrimitive.Content
		data-slot="autocomplete-popup"
		class={cn("cn-autocomplete-popup", className)}
		{...rest}
	>
		{@render children?.()}
	</ComboboxPrimitive.Content>
</ComboboxPrimitive.Portal>
