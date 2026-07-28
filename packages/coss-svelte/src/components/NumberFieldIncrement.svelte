<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import NumberFieldStepButton from "../internal/NumberFieldStepButton.svelte";

type Props = Omit<HTMLButtonAttributes, "children" | "disabled" | "type"> & {
	class?: string;
	ref?: HTMLButtonElement | null;
	children?: Snippet;
};

let { class: className = "", ref = $bindable(null), children, ...rest }: Props = $props();
</script>

<NumberFieldStepButton
	direction={1}
	reason="increment"
	label="Increase value"
	dataSlot="number-field-increment"
	className="cn-number-field-increment"
	class={className}
	bind:ref
	{children}
	{...rest}
/>
