<script>
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children: itemChildren, ...rest } = $props();
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
