<script lang="ts">
import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { normalizeOptions, type Option } from "../internal/props.js";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof RadioGroupPrimitive.Root> & {
	label?: string;
	options?: Option[];
};
let {
	value = $bindable(""),
	label = "",
	options = [],
	orientation = "vertical",
	class: className = "",
	children,
	...rest
}: Props = $props();

let items = $derived(normalizeOptions(options));
</script>

<RadioGroupPrimitive.Root
	data-slot="radio-group"
	class={cn("cn-choice-group", className)}
	bind:value
	{orientation}
	{...rest}
>
	{#if label}
		<span class="cn-choice-label">{label}</span>
	{/if}
	<div class="cn-choice-stack">
		{#if options.length}
			{#each items as normalized}
				<RadioGroupPrimitive.Item
					data-slot="radio-group-item"
					class="cn-radio"
					value={normalized.value}
					disabled={normalized.disabled}
				>
					{#snippet children({ checked })}
						<span
							class="cn-radio-indicator"
							data-state={checked ? "checked" : "unchecked"}
							aria-hidden="true"
						></span>
						<span>{normalized.label}</span>
					{/snippet}
				</RadioGroupPrimitive.Item>
			{/each}
		{:else}
			{@render children?.()}
		{/if}
	</div>
</RadioGroupPrimitive.Root>
