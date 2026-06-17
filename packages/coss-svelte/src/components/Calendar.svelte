<script>
import { Calendar as CalendarPrimitive } from "bits-ui";
import { cn } from "../utils.js";

let {
	type = "single",
	value = $bindable(),
	class: className = "",
	children: rootChildren,
	...rest
} = $props();
</script>

<CalendarPrimitive.Root
	data-slot="calendar"
	class={cn("cn-calendar", className)}
	{type}
	bind:value
	{...rest}
>
	{#snippet children({ months, weekdays })}
		{#if rootChildren}
			{@render rootChildren({ months, weekdays })}
		{:else}
			<CalendarPrimitive.Header data-slot="calendar-header" class="cn-calendar-header">
				<CalendarPrimitive.PrevButton
					data-slot="calendar-prev-button"
					class="cn-calendar-nav-button"
					aria-label="Previous month"
				>
					<span class="cn-calendar-nav-icon cn-calendar-nav-icon-prev" aria-hidden="true"></span>
				</CalendarPrimitive.PrevButton>
				<CalendarPrimitive.Heading data-slot="calendar-heading" class="cn-calendar-heading" />
				<CalendarPrimitive.NextButton
					data-slot="calendar-next-button"
					class="cn-calendar-nav-button"
					aria-label="Next month"
				>
					<span class="cn-calendar-nav-icon cn-calendar-nav-icon-next" aria-hidden="true"></span>
				</CalendarPrimitive.NextButton>
			</CalendarPrimitive.Header>
			{#each months as month}
				<CalendarPrimitive.Grid data-slot="calendar-grid" class="cn-calendar-grid">
					<CalendarPrimitive.GridHead data-slot="calendar-grid-head">
						<CalendarPrimitive.GridRow data-slot="calendar-grid-row" class="cn-calendar-grid-row">
							{#each weekdays as weekday}
								<CalendarPrimitive.HeadCell data-slot="calendar-head-cell" class="cn-calendar-head">
									{weekday}
								</CalendarPrimitive.HeadCell>
							{/each}
						</CalendarPrimitive.GridRow>
					</CalendarPrimitive.GridHead>
					<CalendarPrimitive.GridBody data-slot="calendar-grid-body">
						{#each month.weeks as week}
							<CalendarPrimitive.GridRow data-slot="calendar-grid-row" class="cn-calendar-grid-row">
								{#each week as date}
									<CalendarPrimitive.Cell
										data-slot="calendar-cell"
										class="cn-calendar-cell"
										{date}
										month={month.value}
									>
										<CalendarPrimitive.Day data-slot="calendar-day" class="cn-calendar-day" />
									</CalendarPrimitive.Cell>
								{/each}
							</CalendarPrimitive.GridRow>
						{/each}
					</CalendarPrimitive.GridBody>
				</CalendarPrimitive.Grid>
			{/each}
		{/if}
	{/snippet}
</CalendarPrimitive.Root>
