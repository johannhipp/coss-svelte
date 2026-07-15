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

function handleRootClick(event) {
	const target = event.target;
	if (target instanceof Element && target.matches('[data-slot="combobox-input"]')) {
		open = true;
	}
	if (typeof rest.onclick === "function") {
		rest.onclick(event);
	}
}
</script>

<ComboboxPrimitive.Root
	data-slot="combobox"
	{type}
	bind:value
	bind:open
	{items}
	{...rest}
>
	{#if rootChildren}
		<div class={cn("cn-combobox", className)} onclick={handleRootClick}>
			{@render rootChildren()}
		</div>
	{:else}
		<div data-slot="combobox" class={cn("cn-combobox", className)} onclick={handleRootClick}>
			<span data-slot="combobox-input-group" class="cn-combobox-input-group">
				<span data-slot="combobox-input-control" class="cn-combobox-input-control">
					<ComboboxPrimitive.Input
						data-slot="combobox-input"
						class="cn-combobox-input"
						{placeholder}
					/>
					<ComboboxPrimitive.Trigger
						data-slot="combobox-trigger"
						class="cn-combobox-input-trigger"
					>
						<span data-slot="combobox-icon" class="cn-combobox-icon" aria-hidden="true">
							<svg
								aria-hidden="true"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="m7 15 5 5 5-5" />
								<path d="m7 9 5-5 5 5" />
							</svg>
						</span>
					</ComboboxPrimitive.Trigger>
				</span>
			</span>
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
