<script>
import { DatePicker as DatePickerPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	value = $bindable(),
	open = $bindable(false),
	label = "Choose date",
	class: className = "",
	children: rootChildren,
	...rest
} = $props();

const dateFormatter = new Intl.DateTimeFormat("en-US", {
	day: "numeric",
	month: "long",
	timeZone: "UTC",
	year: "numeric",
});

function formatDateValue(dateValue) {
	if (!dateValue || typeof dateValue !== "object") return "";

	const { day, month, year } = dateValue;
	if (![day, month, year].every(Number.isInteger)) return "";

	return dateFormatter.format(new Date(Date.UTC(year, month - 1, day, 12)));
}

let dateLabel = $derived(formatDateValue(value) || label);
</script>

<DatePickerPrimitive.Root bind:value bind:open {...rest}>
	{#if rootChildren}
		{@render rootChildren()}
	{:else}
		<DatePickerPrimitive.Trigger data-slot="date-picker" class={cn("cn-date-picker", className)}>
			<span class="cn-date-picker-icon" aria-hidden="true"></span>
			<span class="cn-date-picker-label">{dateLabel}</span>
		</DatePickerPrimitive.Trigger>
		<DatePickerPrimitive.Portal>
			<DatePickerPrimitive.Content data-slot="date-picker-popup" class="cn-date-picker-popup">
				<DatePickerPrimitive.Calendar data-slot="calendar" class="cn-calendar">
					{#snippet children({ months, weekdays })}
						<DatePickerPrimitive.Header data-slot="calendar-header" class="cn-calendar-header">
							<DatePickerPrimitive.PrevButton
								data-slot="calendar-prev-button"
								class="cn-calendar-nav-button"
								aria-label="Previous month"
							>
								<span class="cn-calendar-nav-icon cn-calendar-nav-icon-prev" aria-hidden="true"></span>
							</DatePickerPrimitive.PrevButton>
							<DatePickerPrimitive.Heading data-slot="calendar-heading" class="cn-calendar-heading" />
							<DatePickerPrimitive.NextButton
								data-slot="calendar-next-button"
								class="cn-calendar-nav-button"
								aria-label="Next month"
							>
								<span class="cn-calendar-nav-icon cn-calendar-nav-icon-next" aria-hidden="true"></span>
							</DatePickerPrimitive.NextButton>
						</DatePickerPrimitive.Header>
						{#each months as month}
							<DatePickerPrimitive.Grid data-slot="calendar-grid" class="cn-calendar-grid">
								<DatePickerPrimitive.GridHead data-slot="calendar-grid-head">
									<DatePickerPrimitive.GridRow data-slot="calendar-grid-row" class="cn-calendar-grid-row">
										{#each weekdays as weekday}
											<DatePickerPrimitive.HeadCell data-slot="calendar-head-cell" class="cn-calendar-head">
												{weekday}
											</DatePickerPrimitive.HeadCell>
										{/each}
									</DatePickerPrimitive.GridRow>
								</DatePickerPrimitive.GridHead>
								<DatePickerPrimitive.GridBody data-slot="calendar-grid-body">
									{#each month.weeks as week}
										<DatePickerPrimitive.GridRow data-slot="calendar-grid-row" class="cn-calendar-grid-row">
											{#each week as date}
												<DatePickerPrimitive.Cell
													data-slot="calendar-cell"
													class="cn-calendar-cell"
													{date}
													month={month.value}
												>
													<DatePickerPrimitive.Day data-slot="calendar-day" class="cn-calendar-day" />
												</DatePickerPrimitive.Cell>
											{/each}
										</DatePickerPrimitive.GridRow>
									{/each}
								</DatePickerPrimitive.GridBody>
							</DatePickerPrimitive.Grid>
						{/each}
					{/snippet}
				</DatePickerPrimitive.Calendar>
			</DatePickerPrimitive.Content>
		</DatePickerPrimitive.Portal>
	{/if}
</DatePickerPrimitive.Root>
