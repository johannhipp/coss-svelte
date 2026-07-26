<script lang="ts">
import { OTPField, OTPFieldInput } from "coss-svelte";
</script>

<OTPField aria-label="One-time password" length={6}>
	{#snippet children({ cells })}
		{#each cells as cell, index}
			<OTPFieldInput
				{cell}
				aria-label={index === 0 ? undefined : `Character ${index + 1} of 6`}
			>
				{cell.char ?? ""}
			</OTPFieldInput>
		{/each}
	{/snippet}
</OTPField>
