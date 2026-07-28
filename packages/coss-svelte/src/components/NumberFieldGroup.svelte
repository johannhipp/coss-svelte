<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { getNumberFieldContext } from "../internal/number-field-context.svelte.js";
import { cn } from "../utils.js";

type Props = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
	class?: string;
	ref?: HTMLDivElement | null;
	children?: Snippet;
};

let { class: className = "", ref = $bindable(null), children, ...rest }: Props = $props();
const state = getNumberFieldContext();
</script>

<div
	bind:this={ref}
	{...rest}
	data-slot="number-field-group"
	data-size={state.size}
	data-disabled={state.disabled ? "" : undefined}
	data-readonly={state.readonly ? "" : undefined}
	data-invalid={state.invalid ? "" : undefined}
	aria-disabled={state.disabled ? "true" : undefined}
	class={cn("cn-number-field-group", className)}
>
	{@render children?.()}
</div>
