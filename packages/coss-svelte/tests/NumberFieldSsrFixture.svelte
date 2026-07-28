<script lang="ts">
import NumberField from "../src/components/NumberField.svelte";
</script>

<NumberField
	id="server-quantity"
	name="quantity"
	label="Quantity"
	defaultValue={12.5}
	min={0}
	max={99}
/>
