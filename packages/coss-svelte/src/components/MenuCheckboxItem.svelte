<script lang="ts">
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof MenuPrimitive.CheckboxItem>, "children" | "child"> & {
	class?: string;
	children?: ComponentProps<typeof MenuPrimitive.CheckboxItem>["children"];
};

let { class: className = "", children: itemChildren = undefined, ...rest }: Props = $props();
</script>

<MenuPrimitive.CheckboxItem
	data-slot="menu-checkbox-item"
	class={cn("cn-menu-item cn-menu-checkbox-item", className)}
	{...rest}
>
	{#snippet children({ checked, indeterminate })}
		<span
			class="cn-menu-item-indicator"
			data-state={indeterminate ? "indeterminate" : checked ? "checked" : "unchecked"}
			aria-hidden="true"
		></span>
		<span>{@render itemChildren?.({ checked, indeterminate })}</span>
	{/snippet}
</MenuPrimitive.CheckboxItem>
