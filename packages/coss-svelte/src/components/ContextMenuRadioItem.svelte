<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import { cn } from "../utils.js";

type Props = ContextMenuPrimitive.RadioItemProps;
let { value, class: className = "", children: itemChildren, ...rest }: Props = $props();
</script>

<ContextMenuPrimitive.RadioItem
	{value}
	data-slot="context-menu-radio-item"
	class={cn("cn-menu-item cn-menu-radio-item", className)}
	{...rest}
>
	{#snippet children({ checked })}
		<span
			class="cn-menu-item-indicator cn-context-menu-radio-indicator"
			data-state={checked ? "checked" : "unchecked"}
			aria-hidden="true"
		>
			<span></span>
		</span>
		<span class="cn-context-menu-item-label">{@render itemChildren?.({ checked })}</span>
	{/snippet}
</ContextMenuPrimitive.RadioItem>
