<script lang="ts">
import Accordion from "../src/components/Accordion.svelte";
import AlertDialog from "../src/components/AlertDialog.svelte";
import Autocomplete from "../src/components/Autocomplete.svelte";
import Avatar from "../src/components/Avatar.svelte";
import Calendar from "../src/components/Calendar.svelte";
import Collapsible from "../src/components/Collapsible.svelte";
import Combobox from "../src/components/Combobox.svelte";
import Command from "../src/components/Command.svelte";
import DatePicker from "../src/components/DatePicker.svelte";
import Dialog from "../src/components/Dialog.svelte";
import Drawer from "../src/components/Drawer.svelte";
import Menu from "../src/components/Menu.svelte";
import NumberField from "../src/components/NumberField.svelte";
import Pagination from "../src/components/Pagination.svelte";
import Popover from "../src/components/Popover.svelte";
import PreviewCard from "../src/components/PreviewCard.svelte";
import RadioGroup from "../src/components/RadioGroup.svelte";
import Select from "../src/components/Select.svelte";
import Sheet from "../src/components/Sheet.svelte";
import Sidebar from "../src/components/Sidebar.svelte";
import Tabs from "../src/components/Tabs.svelte";
import ToggleGroup from "../src/components/ToggleGroup.svelte";
import Tooltip from "../src/components/Tooltip.svelte";
import TooltipProvider from "../src/components/TooltipProvider.svelte";

const options = [{ label: "fallback-option", value: "fallback" }];
</script>

<section data-testid="children-first-contracts">
	<Accordion items={[{ title: "fallback-accordion", content: "fallback-content" }]}>
		<span data-testid="accordion-child">accordion child</span>
	</Accordion>

	<Avatar fallback="fallback-avatar">
		<span data-testid="avatar-child">avatar child</span>
	</Avatar>

	<Autocomplete {options} placeholder="fallback-autocomplete">
		<span data-testid="autocomplete-child">autocomplete child</span>
	</Autocomplete>

	<Combobox {options} placeholder="fallback-combobox">
		<span data-testid="combobox-child">combobox child</span>
	</Combobox>

	<Command items={["fallback-command"]} placeholder="fallback-command-input">
		<span data-testid="command-child">command child</span>
	</Command>

	<DatePicker label="fallback-date-picker">
		<span data-testid="date-picker-child">date picker child</span>
	</DatePicker>

	<Dialog trigger="fallback-dialog-trigger" title="fallback-dialog-title">
		<span data-testid="dialog-child">dialog child</span>
	</Dialog>

	<AlertDialog trigger="fallback-alert-trigger" title="fallback-alert-title">
		<span data-testid="alert-dialog-child">alert dialog child</span>
	</AlertDialog>

	<Sheet trigger="fallback-sheet-trigger" title="fallback-sheet-title">
		<span data-testid="sheet-child">sheet child</span>
	</Sheet>

	<Drawer trigger="fallback-drawer-trigger" title="fallback-drawer-title">
		<span data-testid="drawer-child">drawer child</span>
	</Drawer>

	<Menu items={["fallback-menu-item"]} label="fallback-menu-trigger">
		<span data-testid="menu-child">menu child</span>
	</Menu>

	<NumberField label="fallback-number-field">
		<span data-testid="number-field-child">number field child</span>
	</NumberField>

	<Popover label="fallback-popover">
		<span data-testid="popover-child">popover child</span>
	</Popover>

	<PreviewCard label="fallback-preview-card" title="fallback-preview-title">
		<span data-testid="preview-card-child">preview card child</span>
	</PreviewCard>

	<RadioGroup label="Radio group name" {options}>
		<span data-testid="radio-group-child">radio group child</span>
	</RadioGroup>

	<Select {options} placeholder="fallback-select">
		<span data-testid="select-child">select child</span>
	</Select>

	<Tabs tabs={["fallback-tab"]}>
		<span data-testid="tabs-child">tabs child</span>
	</Tabs>

	<ToggleGroup items={["fallback-toggle"]}>
		<span data-testid="toggle-group-child">toggle group child</span>
	</ToggleGroup>

	<TooltipProvider>
		<Tooltip label="fallback-tooltip-trigger" tip="fallback-tooltip">
			<span data-testid="tooltip-child">tooltip child</span>
		</Tooltip>
	</TooltipProvider>
</section>

<section data-testid="composition-exceptions">
	<Collapsible title="collapsible trigger" open>
		<span data-testid="collapsible-child">collapsible content</span>
	</Collapsible>

	<Sidebar items={[{ label: "sidebar fallback item", href: "#sidebar-item" }]}>
		<span data-testid="sidebar-child">sidebar child</span>
	</Sidebar>

	<Calendar>
		{#snippet children({ months, weekdays })}
			<span
				data-testid="calendar-payload"
				data-month-count={months.length}
				data-weekday-count={weekdays.length}
			>
				calendar payload
			</span>
		{/snippet}
	</Calendar>

	<Pagination count={30} perPage={10} page={2}>
		{#snippet children({ pages, range, currentPage })}
			<span
				data-testid="pagination-payload"
				data-page-count={pages.length}
				data-range-start={range.start}
				data-current-page={currentPage}
			>
				pagination payload
			</span>
		{/snippet}
	</Pagination>
</section>
