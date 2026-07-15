<script lang="ts">
import Field from "../src/components/Field.svelte";
import Input from "../src/components/Input.svelte";
</script>

<Field label="Email" description="Use your work email." error="Email is invalid" invalid required>
	{#snippet children()}
		<Input />
	{/snippet}
</Field>
