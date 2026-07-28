<script lang="ts">
import Autocomplete from "../src/components/Autocomplete.svelte";
import Checkbox from "../src/components/Checkbox.svelte";
import Combobox from "../src/components/Combobox.svelte";
import DatePicker from "../src/components/DatePicker.svelte";
import Field from "../src/components/Field.svelte";
import RadioGroup from "../src/components/RadioGroup.svelte";
import RadioGroupItem from "../src/components/RadioGroupItem.svelte";
import Select from "../src/components/Select.svelte";
import Switch from "../src/components/Switch.svelte";

const options = [
	{ label: "Svelte", value: "svelte" },
	{ label: "React", value: "react" },
];
</script>

<p id="caller-description">Caller-provided help.</p>
<p id="custom-group-label">Custom group name</p>

<Field
	id="checkbox-field"
	label="Accept terms"
	description="Checkbox help."
	error="Checkbox error."
	required
	invalid
>
	<Checkbox
		aria-describedby="caller-description checkbox-field-description"
	/>
</Field>

<Field id="switch-field" label="Email notifications" description="Switch help." required>
	<Switch />
</Field>

<Field id="select-field" label="Select framework" description="Select help." required>
	<Select options={options} aria-describedby="caller-description select-field-description" />
</Field>

<Field id="combobox-field" label="Combobox framework" description="Combobox help." required>
	<Combobox options={options} />
</Field>

<Field
	id="autocomplete-field"
	label="Autocomplete framework"
	description="Autocomplete help."
	disabled
>
	<Autocomplete options={options} />
</Field>

<Field id="date-field" label="Start date" description="Date help." disabled>
	<DatePicker />
</Field>

<Field id="radio-field" label="Field framework" description="Radio help." required invalid>
	<RadioGroup options={options} />
</Field>

<RadioGroup label="Convenience framework" options={options} />

<RadioGroup label="Compound framework">
	<RadioGroupItem value="svelte">Svelte</RadioGroupItem>
	<RadioGroupItem value="react">React</RadioGroupItem>
</RadioGroup>

<RadioGroup label="Ignored visual label" aria-label="Caller ARIA label" options={options} />

<RadioGroup
	label="Ignored labelled-by visual label"
	aria-labelledby="custom-group-label"
	options={options}
/>

<Field id="override-field" label="Override semantics" required disabled invalid>
	<Checkbox
		id="explicit-checkbox"
		disabled={false}
		required={false}
		aria-invalid="false"
		aria-label="Explicit checkbox"
	/>
</Field>
