<script lang="ts">
import { Button, Field, Form, Input } from "coss-svelte";
</script>

<Form class="grid w-full max-w-sm gap-4">
	<Field label="Name">
		<Input placeholder="Ada Lovelace" />
	</Field>
	<Button type="submit">Save</Button>
</Form>
