<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof MenuPrimitive.RadioGroup>, "child">;

let {
	ref = $bindable(null),
	value = $bindable(""),
	class: className = "",
	children,
	...rest
}: Props = $props();
</script>

<MenuPrimitive.RadioGroup
	bind:ref
	bind:value
	data-slot="menu-radio-group"
	class={cn("cn-menu-radio-group", className)}
	{...rest}
>
	{@render children?.()}
</MenuPrimitive.RadioGroup>
