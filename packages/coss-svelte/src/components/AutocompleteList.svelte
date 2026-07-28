<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

const listInteractionStyle =
	"cursor: pointer; overflow-x: hidden; overflow-y: auto; overscroll-behavior: contain;";

type Props = Omit<ComponentProps<typeof ComboboxPrimitive.Viewport>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();

let listStyle = $derived(
	rest.style ? `${rest.style}; ${listInteractionStyle}` : listInteractionStyle
);
</script>

<ComboboxPrimitive.Viewport
	bind:ref
	{...rest}
	data-slot="autocomplete-list"
	class={cn("cn-autocomplete-list", className)}
	style={listStyle}
>
	{@render children?.()}
</ComboboxPrimitive.Viewport>
