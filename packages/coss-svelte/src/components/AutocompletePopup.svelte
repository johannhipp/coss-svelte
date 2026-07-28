<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

const popupInteractionStyle = "cursor: pointer; overflow: hidden; overscroll-behavior: contain;";

type PortalOptions = Omit<ComponentProps<typeof ComboboxPrimitive.Portal>, "children">;
type Props = Omit<ComponentProps<typeof ComboboxPrimitive.Content>, "children" | "child"> & {
	portalProps?: PortalOptions;
	class?: string;
	children?: Snippet;
};

let {
	ref = $bindable(null),
	portalProps = {},
	class: className = "",
	children,
	...rest
}: Props = $props();

let popupStyle = $derived(
	rest.style ? `${rest.style}; ${popupInteractionStyle}` : popupInteractionStyle
);

function handleWheel(event: Parameters<NonNullable<Props["onwheel"]>>[0]) {
	rest.onwheel?.(event);
	if (event.defaultPrevented || event.deltaY === 0) return;

	const popup = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
	const list = popup?.querySelector('[data-slot="autocomplete-list"]');
	if (!(list instanceof HTMLElement) || list.scrollHeight <= list.clientHeight) {
		event.preventDefault();
		return;
	}

	const maxScrollTop = list.scrollHeight - list.clientHeight;
	const nextScrollTop = Math.min(maxScrollTop, Math.max(0, list.scrollTop + event.deltaY));
	const pointerIsOutsideList = !(event.target instanceof Node && list.contains(event.target));

	if (pointerIsOutsideList) {
		event.preventDefault();
		list.scrollTop = nextScrollTop;
		return;
	}

	if (nextScrollTop === list.scrollTop) {
		event.preventDefault();
	}
}
</script>

<ComboboxPrimitive.Portal {...portalProps}>
	<ComboboxPrimitive.Content
	bind:ref
		{...rest}
		data-slot="autocomplete-popup"
		class={cn("cn-autocomplete-popup", className)}
		style={popupStyle}
		onwheel={handleWheel}
	>
		{@render children?.()}
	</ComboboxPrimitive.Content>
</ComboboxPrimitive.Portal>
