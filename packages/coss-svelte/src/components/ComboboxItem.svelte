<script>
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ComboboxPrimitive.Item
	data-slot="combobox-item"
	class={cn("cn-combobox-item", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.Item>
