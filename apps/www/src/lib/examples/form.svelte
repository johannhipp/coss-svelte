<script lang="ts">
import { Button, Field, FieldError, FieldLabel, Form, Input } from "coss-svelte";

let email = $state("");
let invalid = $state(false);
let loading = $state(false);
let submittedValue = $state("");

async function handleSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
	event.preventDefault();
	invalid = !email.includes("@");
	if (invalid) return;

	loading = true;
	await new Promise((resolve) => setTimeout(resolve, 800));
	submittedValue = String(new FormData(event.currentTarget).get("email") ?? "");
	loading = false;
}
</script>

<Form class="flex w-full max-w-64 flex-col gap-4" novalidate onsubmit={handleSubmit}>
	<Field {invalid}>
		<FieldLabel>Email</FieldLabel>
		<Input bind:value={email} name="email" placeholder="you@example.com" required type="email" />
		{#if invalid}
			<FieldError>Please enter a valid email.</FieldError>
		{/if}
	</Field>
	<Button {loading} type="submit">Submit</Button>
	{#if submittedValue}
		<output class="text-muted-foreground text-sm">Submitted: {submittedValue}</output>
	{/if}
</Form>
