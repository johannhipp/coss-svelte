<script lang="ts">
import Field from "../src/components/Field.svelte";
import FieldDescription from "../src/components/FieldDescription.svelte";
import FieldLabel from "../src/components/FieldLabel.svelte";
import NumberField from "../src/components/NumberField.svelte";
</script>

<Field>
	<FieldLabel>Compound quantity</FieldLabel>
	<NumberField defaultValue={2} />
	<FieldDescription>Choose a compound quantity.</FieldDescription>
</Field>
