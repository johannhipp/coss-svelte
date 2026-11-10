<script lang="ts">
import Field from "../src/components/Field.svelte";
import FieldDescription from "../src/components/FieldDescription.svelte";
import FieldError from "../src/components/FieldError.svelte";
import Input from "../src/components/Input.svelte";
import Textarea from "../src/components/Textarea.svelte";

let {
	description = "",
	error = "",
	invalid,
	compound = false,
	descriptionId = "custom-description",
	errorId = "custom-error",
	showMessages = true,
	describedBy,
	textarea = false,
}: {
	description?: string;
	error?: string;
	invalid?: boolean;
	compound?: boolean;
	descriptionId?: string;
	errorId?: string;
	showMessages?: boolean;
	describedBy?: string;
	textarea?: boolean;
} = $props();
</script>

<Field id="dynamic" label="Email" {description} {error} {invalid}>
	{#if compound && showMessages}
		<FieldDescription id={descriptionId}>Compound help</FieldDescription>
		<FieldError id={errorId}>Compound error</FieldError>
	{/if}
	{#if textarea}
		<Textarea aria-describedby={describedBy} />
	{:else}
		<Input aria-describedby={describedBy} />
	{/if}
</Field>
