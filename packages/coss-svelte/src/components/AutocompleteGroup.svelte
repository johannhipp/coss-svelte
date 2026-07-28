<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ComboboxPrimitive.Group>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<ComboboxPrimitive.Group
	bind:ref
	data-slot="autocomplete-group"
	class={cn("cn-autocomplete-group", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.Group>
