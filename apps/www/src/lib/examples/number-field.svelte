<script lang="ts">
import {
	NumberField,
	NumberFieldDecrement,
	NumberFieldGroup,
	NumberFieldIncrement,
	NumberFieldInput,
	NumberFieldScrubArea,
} from "coss-svelte";

let value = $state<number | null>(3);
</script>

<div class="grid w-full max-w-80 gap-3">
	<NumberField bind:value min={0} max={24} step={0.25} label="Quantity">
		{#snippet children()}
			<NumberFieldScrubArea label="Quantity" />
			<NumberFieldGroup>
				<NumberFieldDecrement />
				<NumberFieldInput />
				<NumberFieldIncrement />
			</NumberFieldGroup>
		{/snippet}
	</NumberField>
	<p class="m-0 text-muted-foreground text-sm" aria-live="polite">
		Current value: {value ?? "empty"}
	</p>
</div>
