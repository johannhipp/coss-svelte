<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof MenuPrimitive.RadioItem>, "child">;
let {
	ref = $bindable(null),
	value,
	class: className = "",
	children: itemChildren,
	...rest
}: Props = $props();
</script>

<MenuPrimitive.RadioItem
	bind:ref
	data-slot="menu-radio-item"
	class={cn("cn-menu-item cn-menu-radio-item", className)}
	{value}
	{...rest}
>
	{#snippet children({ checked })}
		<span
			class="cn-menu-item-indicator"
			data-state={checked ? "checked" : "unchecked"}
			aria-hidden="true"
		></span>
		<span>{@render itemChildren?.({ checked })}</span>
	{/snippet}
</MenuPrimitive.RadioItem>
