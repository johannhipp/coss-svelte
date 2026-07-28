<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof ComboboxPrimitive.Trigger>;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<ComboboxPrimitive.Trigger
	bind:ref
	data-slot="combobox-trigger"
	class={cn("cn-combobox-trigger", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.Trigger>
