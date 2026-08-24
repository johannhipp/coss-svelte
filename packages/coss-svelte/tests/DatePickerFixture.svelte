<script lang="ts">
import { CalendarDate } from "@internationalized/date";
import DatePicker from "../src/components/DatePicker.svelte";

let {
	locale = "en-US",
	previousMonthLabel = "Previous month",
	nextMonthLabel = "Next month",
	open = true,
}: {
	locale?: string;
	previousMonthLabel?: string;
	nextMonthLabel?: string;
	open?: boolean;
} = $props();

let value = $state(new CalendarDate(2026, 7, 28));
</script>

<DatePicker
	bind:value
	bind:open
	{locale}
	{previousMonthLabel}
	{nextMonthLabel}
	label="Pick a date"
/>
