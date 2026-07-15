<script lang="ts">
import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = ComponentProps<typeof RadioGroupPrimitive.Item>;
let { value, class: className = "", children: itemChildren, ...rest }: Props = $props();
</script>

<RadioGroupPrimitive.Item
	data-slot="radio-group-item"
	class={cn("cn-radio", className)}
	{value}
	{...rest}
>
	{#snippet children({ checked })}
		<span
			class="cn-radio-indicator"
			data-state={checked ? "checked" : "unchecked"}
			aria-hidden="true"
		></span>
		<span>{@render itemChildren?.({ checked })}</span>
	{/snippet}
</RadioGroupPrimitive.Item>
