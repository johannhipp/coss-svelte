<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<ComboboxPrimitive.Separator
	data-slot="autocomplete-separator"
	class={cn("cn-autocomplete-separator", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.Separator>
