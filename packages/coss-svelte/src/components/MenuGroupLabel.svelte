<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof MenuPrimitive.GroupHeading>, "child">;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<MenuPrimitive.GroupHeading
	bind:ref
	data-slot="menu-group-label"
	class={cn("cn-menu-group-label", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.GroupHeading>
