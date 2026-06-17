<script>
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	type = "single",
	value = $bindable(""),
	open = $bindable(false),
	options = [],
	placeholder = "Choose",
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
		<div data-slot="combobox" class={cn("cn-combobox", className)}>
			<div class="cn-combobox-control">
				<ComboboxPrimitive.Input
					data-slot="combobox-input"
					class="cn-combobox-input"
					{placeholder}
				/>
				<ComboboxPrimitive.Trigger data-slot="combobox-trigger" class="cn-combobox-trigger">
					Open
				</ComboboxPrimitive.Trigger>
			</div>
			<ComboboxPrimitive.Portal>
				<ComboboxPrimitive.Content data-slot="combobox-popup" class="cn-combobox-popup">
					<ComboboxPrimitive.Viewport data-slot="combobox-list" class="cn-combobox-list">
						{#each items as item}
							<ComboboxPrimitive.Item
								data-slot="combobox-item"
								class="cn-combobox-item"
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
