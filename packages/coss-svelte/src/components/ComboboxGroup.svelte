<script>
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ComboboxPrimitive.Group
	data-slot="combobox-group"
	class={cn("cn-combobox-group", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.Group>
