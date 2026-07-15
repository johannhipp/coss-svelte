<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<ComboboxPrimitive.Trigger
	data-slot="combobox-trigger"
	class={cn("cn-combobox-trigger", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.Trigger>
