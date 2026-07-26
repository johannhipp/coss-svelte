<script lang="ts">
import { Tabs as TabsPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof TabsPrimitive.List>;

let { class: className = "", children, ref = $bindable(null), ...rest }: Props = $props();

let indicatorStyle = $state("");

function updateIndicator() {
	if (!ref) return;

	const activeTrigger = ref.querySelector<HTMLElement>(
		'[data-state="active"], [data-active], [aria-selected="true"]'
	);
	if (!activeTrigger) return;

	const listRect = ref.getBoundingClientRect();
	const triggerRect = activeTrigger.getBoundingClientRect();
	indicatorStyle = [
		`--cn-tabs-indicator-x: ${triggerRect.left - listRect.left}px`,
		`--cn-tabs-indicator-y: ${triggerRect.top - listRect.top}px`,
		`--cn-tabs-indicator-width: ${triggerRect.width}px`,
		`--cn-tabs-indicator-height: ${triggerRect.height}px`,
	].join(";");
}

$effect(() => {
	if (!ref) return;

	updateIndicator();

	const mutationObserver = new MutationObserver(updateIndicator);
	mutationObserver.observe(ref, {
		attributes: true,
		attributeFilter: ["aria-selected", "data-active", "data-state"],
		subtree: true,
	});

	const resizeObserver =
		typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateIndicator);
	resizeObserver?.observe(ref);
	for (const trigger of ref.querySelectorAll<HTMLElement>('[data-slot="tabs-trigger"]')) {
		resizeObserver?.observe(trigger);
	}

	return () => {
		mutationObserver.disconnect();
		resizeObserver?.disconnect();
	};
});
</script>

<TabsPrimitive.List
	bind:ref
	data-slot="tabs-list"
	class={cn("cn-tabs-list", className)}
	{...rest}
>
	{@render children?.()}
	<span
		aria-hidden="true"
		class="cn-tabs-indicator"
		data-ready={indicatorStyle ? "" : undefined}
		data-slot="tabs-indicator"
		style={indicatorStyle}
	></span>
</TabsPrimitive.List>
