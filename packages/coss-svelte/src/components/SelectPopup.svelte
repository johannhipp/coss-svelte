<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type PortalOptions = Omit<ComponentProps<typeof SelectPrimitive.Portal>, "children">;
type Props = Omit<ComponentProps<typeof SelectPrimitive.Content>, "children" | "child"> & {
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

<SelectPrimitive.Portal {...portalProps}>
	<SelectPrimitive.Content bind:ref data-slot="select-popup" class={cn("cn-select-popup", className)} {...rest}>
		{@render children?.()}
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>
