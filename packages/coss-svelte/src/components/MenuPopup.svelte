<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof MenuPrimitive.Content>, "children" | "child"> & {
	class?: string;
	children?: Snippet;
};

let { class: className = "", children, ...rest }: Props = $props();
</script>

<MenuPrimitive.Portal>
	<MenuPrimitive.Content data-slot="menu-popup" class={cn("cn-menu-popup", className)} {...rest}>
		{@render children?.()}
	</MenuPrimitive.Content>
</MenuPrimitive.Portal>
