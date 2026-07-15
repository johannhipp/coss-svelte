<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof MenuPrimitive.Item>, "children" | "child"> & {
	class?: string;
	children?: Snippet;
	variant?: string;
};

let { class: className = "", children, variant = "default", ...rest }: Props = $props();
</script>

<MenuPrimitive.Item
	data-slot="menu-item"
	data-variant={variant}
	class={cn("cn-menu-item", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.Item>
