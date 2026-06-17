<script>
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	type = "single",
	value = $bindable(""),
	open = $bindable(false),
	options = [],
	placeholder = "Search",
	class: className = "",
	children: rootChildren,
	...rest
} = $props();

let items = $derived(
	options.map((option) => ({
		value: option.value ?? option,
		label: option.label ?? option,
		disabled: option.disabled ?? false,
	}))
);
</script>

<ComboboxPrimitive.Root {type} bind:value bind:open {items} {...rest}>
	{#if rootChildren}
		{@render rootChildren()}
	{:else}
		<div data-slot="autocomplete" class={cn("cn-autocomplete", className)}>
			<ComboboxPrimitive.Input
				data-slot="autocomplete-input"
				class="cn-autocomplete-input"
				{placeholder}
			/>
			<ComboboxPrimitive.Portal>
				<ComboboxPrimitive.Content data-slot="autocomplete-popup" class="cn-autocomplete-popup">
					<ComboboxPrimitive.Viewport data-slot="autocomplete-list" class="cn-autocomplete-list">
						{#each items as item}
							<ComboboxPrimitive.Item
								data-slot="autocomplete-item"
								class="cn-autocomplete-item"
								value={item.value}
								label={item.label}
								disabled={item.disabled}
							>
								{item.label}
							</ComboboxPrimitive.Item>
						{/each}
					</ComboboxPrimitive.Viewport>
				</ComboboxPrimitive.Content>
			</ComboboxPrimitive.Portal>
		</div>
	{/if}
</ComboboxPrimitive.Root>
