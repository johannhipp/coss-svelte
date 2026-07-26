<script lang="ts">
import { Field, Fieldset, Input } from "coss-svelte";
</script>

<Fieldset legend="Contact details" description="How can we reach you?">
	<Field label="Email">
		<Input type="email" placeholder="you@example.com" />
	</Field>
</Fieldset>
