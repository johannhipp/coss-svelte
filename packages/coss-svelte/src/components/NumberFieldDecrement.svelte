<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import NumberFieldStepButton from "../internal/NumberFieldStepButton.svelte";

type Props = Omit<HTMLButtonAttributes, "children" | "disabled" | "type"> & {
	class?: string;
	children?: Snippet;
};

let { class: className = "", children, ...rest }: Props = $props();
</script>

<NumberFieldStepButton
	direction={-1}
	reason="decrement"
	label="Decrease value"
	dataSlot="number-field-decrement"
	className="cn-number-field-decrement"
	class={className}
	{children}
	{...rest}
/>
