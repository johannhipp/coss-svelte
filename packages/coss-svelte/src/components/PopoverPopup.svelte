<script lang="ts">
import { Popover as PopoverPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type PortalOptions = Omit<ComponentProps<typeof PopoverPrimitive.Portal>, "children">;
type Props = Omit<ComponentProps<typeof PopoverPrimitive.Content>, "children" | "child"> & {
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
</script>

<PopoverPrimitive.Portal {...portalProps}>
	<PopoverPrimitive.Content bind:ref data-slot="popover-popup" class={cn("cn-popover-content", className)} {...rest}>
		{@render children?.()}
	</PopoverPrimitive.Content>
</PopoverPrimitive.Portal>
