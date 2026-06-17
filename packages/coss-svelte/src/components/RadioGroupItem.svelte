<script>
import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", children: itemChildren, ...rest } = $props();
</script>

<RadioGroupPrimitive.Item
	data-slot="radio-group-item"
	class={cn("cn-radio", className)}
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
