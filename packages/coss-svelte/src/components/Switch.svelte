<script lang="ts">
import { Label as LabelPrimitive, Switch as SwitchPrimitive, useId } from "bits-ui";
import type { NativeProps } from "../internal/props.js";
import { cn } from "../utils.js";

let {
	id = useId(),
	checked = $bindable(false),
	label = "",
	class: className = "",
	children,
	...rest
}: NativeProps & {
	id?: string;
	checked?: boolean;
	label?: string;
} = $props();
</script>

<span data-slot="switch-field" class="cn-switch-field">
	<SwitchPrimitive.Root
		{id}
		data-slot="switch"
		class={cn("cn-switch", className)}
		bind:checked
		{...rest}
	>
		{#if children}
			{@render children()}
		{:else}
			<SwitchPrimitive.Thumb data-slot="switch-thumb" class="cn-switch-thumb" />
		{/if}
	</SwitchPrimitive.Root>
	{#if label}
		<LabelPrimitive.Root for={id} class="cn-switch-label">{label}</LabelPrimitive.Root>
	{/if}
</span>
