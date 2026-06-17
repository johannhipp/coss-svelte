<script>
import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	value = $bindable(""),
	label = "",
	options = [],
	orientation = "vertical",
	class: className = "",
	children,
	...rest
} = $props();
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
			{#each options as option}
				<RadioGroupPrimitive.Item
					data-slot="radio-group-item"
					class="cn-radio"
					value={option.value ?? option}
					disabled={option.disabled}
				>
					{#snippet children({ checked })}
						<span
							class="cn-radio-indicator"
							data-state={checked ? "checked" : "unchecked"}
							aria-hidden="true"
						></span>
						<span>{option.label ?? option}</span>
					{/snippet}
				</RadioGroupPrimitive.Item>
			{/each}
		{:else}
			{@render children?.()}
		{/if}
	</div>
</RadioGroupPrimitive.Root>
