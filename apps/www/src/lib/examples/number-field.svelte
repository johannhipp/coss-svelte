<script lang="ts">
import {
	NumberField,
	NumberFieldDecrement,
	NumberFieldGroup,
	NumberFieldIncrement,
	NumberFieldInput,
} from "coss-svelte";

let value = $state<number | null>(0);
</script>

<NumberField bind:value aria-label="Amount">
	{#snippet children()}
		<NumberFieldGroup>
			<NumberFieldDecrement />
			<NumberFieldInput />
			<NumberFieldIncrement />
		</NumberFieldGroup>
	{/snippet}
</NumberField>
