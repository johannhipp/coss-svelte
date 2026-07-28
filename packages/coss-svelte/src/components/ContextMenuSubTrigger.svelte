<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import {
	getContextMenuContext,
	getContextMenuSubContext,
} from "../internal/context-menu-context.svelte.js";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.SubTrigger>, "children"> & {
	inset?: boolean;
	class?: string;
	children?: Snippet;
};
let {
	ref = $bindable(null),
	child,
	inset = false,
	class: className = "",
	children,
	...rest
}: Props = $props();

const contextMenu = getContextMenuContext();
const sub = getContextMenuSubContext();

$effect(() => {
	const trigger = ref;
	sub.setTrigger(trigger);
	return () => {
		if (sub.trigger === trigger) sub.setTrigger(null);
	};
});
</script>

<ContextMenuPrimitive.SubTrigger
	{...rest}
	bind:ref
	{child}
	data-slot="context-menu-sub-trigger"
	data-inset={inset ? "" : undefined}
	data-direction={contextMenu.dir}
	class={cn("cn-menu-sub-trigger", className)}
>
	{#if !child}
		{@render children?.()}
		<svg
			class="cn-context-menu-sub-chevron"
			data-direction={contextMenu.dir}
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
		>
			<path
				d="m6 3.5 4.5 4.5L6 12.5"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
			/>
		</svg>
	{/if}
</ContextMenuPrimitive.SubTrigger>
