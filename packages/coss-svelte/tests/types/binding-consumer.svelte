<script lang="ts">
import type { DateValue } from "@internationalized/date";
import {
	Accordion,
	Autocomplete,
	Calendar,
	Combobox,
	Select,
	Slider,
	ToggleGroup,
} from "coss-svelte";

let accordionSingle = $state<string | undefined>();
let accordionMultiple = $state<string[] | undefined>();
let calendarSingle = $state<DateValue | undefined>();
let calendarMultiple = $state<DateValue[] | undefined>();
let sliderSingle = $state<number | undefined>();
let sliderMultiple = $state<number[] | undefined>();
let selectSingle = $state<string | undefined>();
let selectMultiple = $state<string[] | undefined>();
let comboboxSingle = $state<string | undefined>();
let comboboxMultiple = $state<string[] | undefined>();
let autocompleteSingle = $state<string | undefined>();
let autocompleteMultiple = $state<string[] | undefined>();
let toggleSingle = $state<string | undefined>();
let toggleMultiple = $state<string[] | undefined>();
</script>

<Accordion bind:value={accordionSingle} />
<Accordion type="multiple" bind:value={accordionMultiple} />
<Calendar bind:value={calendarSingle} />
<Calendar type="multiple" bind:value={calendarMultiple} />
<Slider bind:value={sliderSingle} />
<Slider type="multiple" bind:value={sliderMultiple} />
<Select bind:value={selectSingle} />
<Select type="multiple" bind:value={selectMultiple} />
<Combobox bind:value={comboboxSingle} />
<Combobox type="multiple" bind:value={comboboxMultiple} />
<Autocomplete bind:value={autocompleteSingle} />
<Autocomplete type="multiple" bind:value={autocompleteMultiple} />
<ToggleGroup bind:value={toggleSingle} />
<ToggleGroup type="multiple" bind:value={toggleMultiple} />
