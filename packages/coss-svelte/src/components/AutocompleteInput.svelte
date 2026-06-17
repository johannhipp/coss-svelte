<script>
import { Combobox as ComboboxPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let { class: className = "", showTrigger = false, triggerProps = {}, ...rest } = $props();

let triggerClass = $derived(triggerProps.class ?? "");
let triggerLabel = $derived(triggerProps["aria-label"] ?? "Toggle autocomplete suggestions");
let triggerRest = $derived.by(() => {
	const { class: _class, "aria-label": _ariaLabel, children: _children, ...attrs } = triggerProps;
	return attrs;
});
</script>

{#if showTrigger}
	<span data-slot="autocomplete-input-group" class="cn-autocomplete-input-group">
		<ComboboxPrimitive.Input
			data-slot="autocomplete-input"
			class={cn("cn-autocomplete-input", className)}
			{...rest}
		/>
		<ComboboxPrimitive.Trigger
			data-slot="autocomplete-trigger"
			class={cn("cn-autocomplete-trigger", triggerClass)}
			aria-label={triggerLabel}
			{...triggerRest}
		>
			<span aria-hidden="true">v</span>
		</ComboboxPrimitive.Trigger>
	</span>
{:else}
	<ComboboxPrimitive.Input
		data-slot="autocomplete-input"
		class={cn("cn-autocomplete-input", className)}
		{...rest}
	/>
{/if}
