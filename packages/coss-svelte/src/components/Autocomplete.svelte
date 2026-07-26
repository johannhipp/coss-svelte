<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { type NormalizedOption, normalizeOptions, type Option } from "../internal/props.js";
import { cn } from "../utils.js";
import AutocompleteList from "./AutocompleteList.svelte";
import AutocompletePopup from "./AutocompletePopup.svelte";

type RootProps = ComponentProps<typeof ComboboxPrimitive.Root>;
type Props = Omit<RootProps, "children" | "items" | "type" | "value" | "open" | "onValueChange"> & {
	type?: "single" | "multiple";
	value?: string | string[];
	open?: boolean;
	onValueChange?: (value: string | string[]) => void;
	options?: Option[];
	placeholder?: string;
	class?: string;
	children?: Snippet;
};

let {
	type = "single",
	value = $bindable(""),
	open = $bindable(false),
	options = [],
	placeholder = "Search",
	class: className = "",
	children: rootChildren,
	onValueChange,
	...rest
}: Props = $props();

let items: NormalizedOption[] = $derived(normalizeOptions(options));
</script>

{#snippet content()}
	{#if rootChildren}
		{@render rootChildren()}
	{:else}
		<div data-slot="autocomplete" class={cn("cn-autocomplete", className)}>
			<ComboboxPrimitive.Input
				data-slot="autocomplete-input"
				class="cn-autocomplete-input"
				{placeholder}
				onfocus={() => {
					open = true;
				}}
				oninput={() => {
					open = true;
				}}
			/>
			<AutocompletePopup>
				<AutocompleteList>
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
				</AutocompleteList>
			</AutocompletePopup>
		</div>
	{/if}
{/snippet}

{#if type === "multiple"}
	<ComboboxPrimitive.Root
		type="multiple"
		value={Array.isArray(value) ? value : []}
		bind:open
		{items}
		onValueChange={(next) => {
			value = next;
			onValueChange?.(next);
		}}
		{...rest}
	>
		{@render content()}
	</ComboboxPrimitive.Root>
{:else}
	<ComboboxPrimitive.Root
		type="single"
		value={typeof value === "string" ? value : ""}
		bind:open
		{items}
		onValueChange={(next) => {
			value = next;
			onValueChange?.(next);
		}}
		{...rest}
	>
		{@render content()}
	</ComboboxPrimitive.Root>
{/if}
