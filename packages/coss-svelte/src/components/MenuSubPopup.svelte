<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof MenuPrimitive.SubContent>, "children" | "child"> & {
	class?: string;
	children?: Snippet;
};

let { class: className = "", children, ...rest }: Props = $props();
</script>

<MenuPrimitive.SubContent
	data-slot="menu-sub-popup"
	class={cn("cn-menu-sub-popup", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.SubContent>
