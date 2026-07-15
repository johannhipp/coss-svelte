<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<ComboboxPrimitive.Group
	data-slot="autocomplete-group"
	class={cn("cn-autocomplete-group", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.Group>
