<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof MenuPrimitive.Group>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<MenuPrimitive.Group
	bind:ref
	data-slot="menu-group"
	class={cn("cn-menu-group", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.Group>
