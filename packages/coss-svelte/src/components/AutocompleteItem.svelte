<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ComboboxPrimitive.Item>, "children" | "child"> & {
	children?: Snippet;
};
let { ref = $bindable(null), value, class: className = "", children, ...rest }: Props = $props();
</script>

<ComboboxPrimitive.Item
	bind:ref
	data-slot="autocomplete-item"
	class={cn("cn-autocomplete-item", className)}
	{value}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.Item>
