<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<ComboboxPrimitive.GroupHeading
	data-slot="combobox-group-label"
	class={cn("cn-combobox-group-label", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.GroupHeading>
