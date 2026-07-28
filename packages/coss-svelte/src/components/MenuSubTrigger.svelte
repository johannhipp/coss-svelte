<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof MenuPrimitive.SubTrigger>;

let { ref = $bindable(null), class: className = "", children, ...rest }: Props = $props();
</script>

<MenuPrimitive.SubTrigger
	bind:ref
	data-slot="menu-sub-trigger"
	class={cn("cn-menu-sub-trigger", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.SubTrigger>
