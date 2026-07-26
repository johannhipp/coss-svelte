<script lang="ts">
import { Field, FieldDescription, FieldLabel, Fieldset, FieldsetLegend, Input } from "coss-svelte";
</script>

<Fieldset class="flex w-full flex-col gap-6">
	<FieldsetLegend>Billing Details</FieldsetLegend>
	<Field>
		<FieldLabel>Company</FieldLabel>
		<Input placeholder="Enter company name" type="text" />
		<FieldDescription>The name that will appear on invoices.</FieldDescription>
	</Field>
	<Field>
		<FieldLabel>Tax ID</FieldLabel>
		<Input placeholder="Enter tax identification number" type="text" />
		<FieldDescription>Your business tax identification number.</FieldDescription>
	</Field>
</Fieldset>
