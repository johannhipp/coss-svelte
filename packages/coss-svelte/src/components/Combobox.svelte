<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { type NormalizedOption, normalizeOptions, type Option } from "../internal/props.js";
import { cn } from "../utils.js";

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
	placeholder = "Choose",
	class: className = "",
	children: rootChildren,
	onValueChange,
	...rest
}: Props = $props();

let items: NormalizedOption[] = $derived(normalizeOptions(options));
</script>

{#snippet content()}
	{#if rootChildren}
		<div class={cn("cn-combobox", className)}>
			{@render rootChildren()}
		</div>
	{:else}
		<div data-slot="combobox" class={cn("cn-combobox", className)}>
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
