<script lang="ts">
import NumberField from "../src/components/NumberField.svelte";
import NumberFieldDecrement from "../src/components/NumberFieldDecrement.svelte";
import NumberFieldGroup from "../src/components/NumberFieldGroup.svelte";
import NumberFieldIncrement from "../src/components/NumberFieldIncrement.svelte";
import NumberFieldInput from "../src/components/NumberFieldInput.svelte";
import NumberFieldScrubArea from "../src/components/NumberFieldScrubArea.svelte";

let value = $state<number | null>(1.5);
</script>

<NumberField
	bind:value
	defaultValue={1.5}
	form="external-number-form"
	label="External quantity"
	name="quantity"
	step={0.5}
>
	<NumberFieldScrubArea label="External quantity" />
	<NumberFieldGroup>
		<NumberFieldDecrement />
		<NumberFieldInput />
		<NumberFieldIncrement />
	</NumberFieldGroup>
</NumberField>

<form id="external-number-form" data-testid="external-number-form">
	<button type="reset">Reset external</button>
</form>

<output data-testid="external-number-value">{value ?? "null"}</output>
