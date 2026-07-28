<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof MenuPrimitive.Trigger>;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<MenuPrimitive.Trigger
	bind:ref
	data-slot="menu-trigger"
	class={cn("cn-menu-trigger", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.Trigger>
