<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type PortalOptions = Omit<ComponentProps<typeof MenuPrimitive.Portal>, "children">;
type Props = Omit<ComponentProps<typeof MenuPrimitive.Content>, "children" | "child"> & {
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

<MenuPrimitive.Portal {...portalProps}>
	<MenuPrimitive.Content bind:ref data-slot="menu-popup" class={cn("cn-menu-popup", className)} {...rest}>
		{@render children?.()}
	</MenuPrimitive.Content>
</MenuPrimitive.Portal>
