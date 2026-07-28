<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof MenuPrimitive.Sub>, "children"> & {
	class?: string;
	children?: Snippet;
};

let { open = $bindable(false), class: className = "", children, ...rest }: Props = $props();
</script>

<MenuPrimitive.Sub bind:open {...rest}>
	<span data-slot="menu-sub" class={cn("cn-menu-sub-shell", className)}>
		{@render children?.()}
	</span>
</MenuPrimitive.Sub>
