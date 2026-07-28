<script lang="ts">
import { Tooltip as TooltipPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type PortalOptions = Omit<ComponentProps<typeof TooltipPrimitive.Portal>, "children">;
type Props = Omit<ComponentProps<typeof TooltipPrimitive.Content>, "children" | "child"> & {
	portalProps?: PortalOptions;
	class?: string;
	children?: Snippet;
};

const generatedId = $props.id();
let {
	ref = $bindable(null),
	id = generatedId,
	role = "tooltip",
	portalProps = {},
	class: className = "",
	children,
	...rest
}: Props = $props();
</script>

<TooltipPrimitive.Portal {...portalProps}>
	<TooltipPrimitive.Content
	bind:ref
		{...rest}
		{id}
		{role}
		data-slot="tooltip-popup"
		class={cn("cn-tooltip-content", className)}
	>
		{@render children?.()}
	</TooltipPrimitive.Content>
</TooltipPrimitive.Portal>
