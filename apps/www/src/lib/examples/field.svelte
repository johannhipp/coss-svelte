<script lang="ts">
import { Field, FieldDescription, FieldLabel, Input } from "coss-svelte";
</script>

<Field>
	<FieldLabel>Name</FieldLabel>
	<Input placeholder="Enter your name" type="text" />
	<FieldDescription>Visible on your profile</FieldDescription>
</Field>
