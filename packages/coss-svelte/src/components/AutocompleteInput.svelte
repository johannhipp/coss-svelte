<script lang="ts">
import { Combobox as ComboboxPrimitive } from "bits-ui";
import type { ComponentProps } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof ComboboxPrimitive.Input>, "children" | "child"> & {
	class?: string;
	showTrigger?: boolean;
	triggerProps?: ComponentProps<typeof ComboboxPrimitive.Trigger>;
};

let {
	ref = $bindable(null),
	class: className = "",
	showTrigger = false,
	triggerProps = {},
	...rest
}: Props = $props();

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
			bind:ref
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
		bind:ref
		data-slot="autocomplete-input"
		class={cn("cn-autocomplete-input", className)}
		{...rest}
	/>
{/if}
