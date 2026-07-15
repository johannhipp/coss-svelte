<script>
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../utils.js";

const popupInteractionStyle = "cursor: pointer; overflow: hidden; overscroll-behavior: contain;";

let { class: className = "", children, ...rest } = $props();

let popupStyle = $derived(
	rest.style ? `${rest.style}; ${popupInteractionStyle}` : popupInteractionStyle
);

function handleWheel(event) {
	rest.onwheel?.(event);
	if (event.defaultPrevented || event.deltaY === 0) return;

	const popup = event.currentTarget;
	const list = popup?.querySelector?.('[data-slot="autocomplete-list"]');
	if (!(list instanceof HTMLElement) || list.scrollHeight <= list.clientHeight) {
		event.preventDefault();
		return;
	}

	const maxScrollTop = list.scrollHeight - list.clientHeight;
	const nextScrollTop = Math.min(maxScrollTop, Math.max(0, list.scrollTop + event.deltaY));
	const pointerIsOutsideList = !list.contains(event.target);

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

<ComboboxPrimitive.Portal>
	<ComboboxPrimitive.Content
		{...rest}
		data-slot="autocomplete-popup"
		class={cn("cn-autocomplete-popup", className)}
		style={popupStyle}
		onwheel={handleWheel}
	>
		{@render children?.()}
	</ComboboxPrimitive.Content>
</ComboboxPrimitive.Portal>
