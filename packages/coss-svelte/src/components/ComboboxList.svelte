<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let { class: className = "", children, ...rest }: NativeProps = $props();
</script>

<ComboboxPrimitive.Viewport
	data-slot="combobox-list"
	class={cn("cn-combobox-list", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.Viewport>
