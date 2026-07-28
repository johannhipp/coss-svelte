<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof MenuPrimitive.Separator>, "child">;

let {
	ref = $bindable(null),
	class: className = "",
	children = undefined,
	...rest
}: Props = $props();
</script>

<MenuPrimitive.Separator
	bind:ref
	data-slot="menu-separator"
	class={cn("cn-menu-separator", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.Separator>
