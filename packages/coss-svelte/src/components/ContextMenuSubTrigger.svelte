<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ContextMenuPrimitive.SubTrigger>, "child" | "children"> & {
	inset?: boolean;
	class?: string;
	children?: Snippet;
};
let { inset = false, class: className = "", children, ...rest }: Props = $props();
</script>

<ContextMenuPrimitive.SubTrigger
	data-slot="context-menu-sub-trigger"
	data-inset={inset ? "" : undefined}
	class={cn("cn-menu-sub-trigger", className)}
	{...rest}
>
	{@render children?.()}
	<svg
		class="cn-context-menu-sub-chevron"
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
</ContextMenuPrimitive.SubTrigger>
