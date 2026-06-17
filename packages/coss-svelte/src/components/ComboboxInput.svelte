<script>
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", showTrigger = true, triggerProps = {}, ...rest } = $props();

let triggerClass = $derived(triggerProps.class ?? "");
let triggerLabel = $derived(triggerProps["aria-label"] ?? "Toggle combobox options");
let triggerRest = $derived.by(() => {
	const { class: _class, "aria-label": _ariaLabel, children: _children, ...attrs } = triggerProps;
	return attrs;
});
</script>

{#if showTrigger}
	<span data-slot="combobox-input-group" class="cn-combobox-input-group">
		<ComboboxPrimitive.Input
			data-slot="combobox-input"
			class={cn("cn-combobox-input", className)}
			{...rest}
		/>
		<ComboboxPrimitive.Trigger
			data-slot="combobox-trigger"
			class={cn("cn-combobox-input-trigger", triggerClass)}
			aria-label={triggerLabel}
			{...triggerRest}
		>
			<span aria-hidden="true">v</span>
		</ComboboxPrimitive.Trigger>
	</span>
{:else}
	<ComboboxPrimitive.Input
		data-slot="combobox-input"
		class={cn("cn-combobox-input", className)}
		{...rest}
	/>
{/if}
