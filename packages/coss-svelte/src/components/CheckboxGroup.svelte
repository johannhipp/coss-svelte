<script lang="ts">
import { Checkbox as CheckboxPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type Props = Omit<ComponentProps<typeof CheckboxPrimitive.Group>, "children" | "child"> & {
	label?: string;
	children?: Snippet;
};

let {
	value = $bindable([]),
	label = "",
	class: className = "",
	children,
	...rest
}: Props = $props();
</script>

<CheckboxPrimitive.Group
	data-slot="checkbox-group"
	class={cn("cn-choice-group", className)}
	bind:value
	{...rest}
>
	{#if label}
		<CheckboxPrimitive.GroupLabel class="cn-choice-label">{label}</CheckboxPrimitive.GroupLabel>
	{/if}
	<div class="cn-choice-stack">
		{@render children?.()}
	</div>
</CheckboxPrimitive.Group>
