<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ComboboxPrimitive.Separator>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<ComboboxPrimitive.Separator
	bind:ref
	data-slot="autocomplete-separator"
	class={cn("cn-autocomplete-separator", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.Separator>
