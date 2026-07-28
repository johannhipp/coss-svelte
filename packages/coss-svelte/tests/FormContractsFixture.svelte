<script lang="ts">
import Autocomplete from "../src/components/Autocomplete.svelte";
import Checkbox from "../src/components/Checkbox.svelte";
import CheckboxGroup from "../src/components/CheckboxGroup.svelte";
import Combobox from "../src/components/Combobox.svelte";
import Input from "../src/components/Input.svelte";
import OTPField from "../src/components/OTPField.svelte";
import RadioGroup from "../src/components/RadioGroup.svelte";
import Select from "../src/components/Select.svelte";
import Switch from "../src/components/Switch.svelte";
import Textarea from "../src/components/Textarea.svelte";

const options = [
	{ label: "Svelte", value: "svelte" },
	{ label: "React", value: "react" },
];
</script>

<form data-testid="form">
	<Input name="native-input" value="alpha" aria-label="Native input" />
	<Input name="native-empty" value="" aria-label="Empty native input" />
	<Input name="native-disabled" value="omitted" disabled aria-label="Disabled native input" />
	<Textarea name="native-textarea" value="notes" aria-label="Native textarea" />
	<Textarea name="textarea-disabled" value="omitted" disabled aria-label="Disabled textarea" />
	<OTPField name="otp" value="4821" length={4} aria-label="Verification code" />
	<OTPField
		name="otp-disabled"
		value="9999"
		length={4}
		disabled
		aria-label="Disabled verification code"
	/>

	<Switch name="switch-checked" value="enabled" checked aria-label="Checked switch" />
	<Switch name="switch-unchecked" value="enabled" aria-label="Unchecked switch" />
	<Switch name="switch-disabled" value="enabled" checked disabled aria-label="Disabled switch" />
	<Switch name="switch-required" required aria-label="Required switch" />

	<Checkbox name="checkbox-default" checked aria-label="Default checkbox" />
	<Checkbox name="checkbox-custom" value="custom" checked aria-label="Custom checkbox" />
	<Checkbox name="checkbox-unchecked" value="unchecked" aria-label="Unchecked checkbox" />
	<Checkbox
		name="checkbox-disabled"
		value="disabled"
		checked
		disabled
		aria-label="Disabled checkbox"
	/>

	<CheckboxGroup name="checkbox-group" value={["svelte", "react"]} aria-label="Frameworks">
		<Checkbox value="svelte" aria-label="Svelte checkbox" />
		<Checkbox value="react" aria-label="React checkbox" />
		<Checkbox value="vue" aria-label="Vue checkbox" />
	</CheckboxGroup>
	<CheckboxGroup
		name="checkbox-group-disabled"
		value={["svelte"]}
		disabled
		aria-label="Disabled frameworks"
	>
		<Checkbox value="svelte" aria-label="Disabled Svelte checkbox" />
	</CheckboxGroup>
	<CheckboxGroup name="checkbox-group-required" required aria-label="Required frameworks">
		<Checkbox value="svelte" aria-label="Required Svelte checkbox" />
	</CheckboxGroup>

	<RadioGroup name="radio" value="react" options={options} aria-label="Radio framework" />
	<RadioGroup
		name="radio-disabled"
		value="svelte"
		options={options}
		disabled
		aria-label="Disabled radio framework"
	/>
	<RadioGroup name="radio-required" options={options} required aria-label="Required radio framework" />

	<Select
		name="select"
		value="svelte"
		options={options}
		autocomplete="organization"
		aria-label="Select framework"
	/>
	<Select name="select-empty" value="" options={options} aria-label="Empty select framework" />
	<Select
		name="select-disabled"
		value="svelte"
		options={options}
		disabled
		aria-label="Disabled select framework"
	/>
	<Select name="select-required" value="" options={options} required aria-label="Required select" />

	<Combobox
		name="combobox"
		value="react"
		options={options}
		aria-label="Combobox framework"
	/>
	<Combobox
		name="combobox-disabled"
		value="svelte"
		options={options}
		disabled
		aria-label="Disabled combobox"
	/>

	<Autocomplete
		name="autocomplete"
		value="svelte"
		options={options}
		aria-label="Autocomplete framework"
	/>
	<Autocomplete
		name="autocomplete-disabled"
		value="react"
		options={options}
		disabled
		aria-label="Disabled autocomplete"
	/>
</form>
