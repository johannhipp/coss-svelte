<script>
import { DropdownMenu as MenuPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children: itemChildren, ...rest } = $props();
</script>

<MenuPrimitive.RadioItem
	data-slot="menu-radio-item"
	class={cn("cn-menu-item cn-menu-radio-item", className)}
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
