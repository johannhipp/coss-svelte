<script>
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest } = $props();
</script>

<ComboboxPrimitive.Trigger
	data-slot="combobox-trigger"
	class={cn("cn-combobox-trigger", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.Trigger>
