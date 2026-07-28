<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ComboboxPrimitive.GroupHeading>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<ComboboxPrimitive.GroupHeading
	bind:ref
	data-slot="autocomplete-group-label"
	class={cn("cn-autocomplete-group-label", className)}
	{...rest}
>
	{@render children?.()}
</ComboboxPrimitive.GroupHeading>
