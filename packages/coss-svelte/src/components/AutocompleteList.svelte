<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

const listInteractionStyle =
	"cursor: pointer; overflow-x: hidden; overflow-y: auto; overscroll-behavior: contain;";

let { class: className = "", children, ...rest }: NativeProps = $props();

let listStyle = $derived(
	rest.style ? `${rest.style}; ${listInteractionStyle}` : listInteractionStyle
);
</script>

<ComboboxPrimitive.Viewport
	{...rest}
	data-slot="autocomplete-list"
	class={cn("cn-autocomplete-list", className)}
	style={listStyle}
>
	{@render children?.()}
</ComboboxPrimitive.Viewport>
