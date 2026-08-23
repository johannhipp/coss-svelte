<script lang="ts">
import { DatePicker as DatePickerPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { getFieldContext, mergeFieldIds } from "../internal/field-context.svelte.js";
import { cn } from "../utils.js";

type RootProps = ComponentProps<typeof DatePickerPrimitive.Root>;
type DateValue = NonNullable<RootProps["value"]>;
type TriggerAccessibilityProps = Pick<
	ComponentProps<typeof DatePickerPrimitive.Trigger>,
	"id" | "aria-label" | "aria-labelledby" | "aria-describedby" | "aria-invalid"
>;
type Props = Omit<RootProps, "children"> &
	TriggerAccessibilityProps & {
		label?: string;
		previousMonthLabel?: string;
		nextMonthLabel?: string;
		class?: ComponentProps<typeof DatePickerPrimitive.Trigger>["class"];
		children?: Snippet;
	};

let {
	value = $bindable(),
	placeholder = $bindable(),
	open = $bindable(false),
	label = "Pick a date",
	previousMonthLabel = "Previous month",
	nextMonthLabel = "Next month",
	locale = "en-US",
	id,
	disabled,
	required,
	"aria-label": ariaLabel,
	"aria-labelledby": ariaLabelledBy,
	"aria-describedby": ariaDescribedBy,
	"aria-invalid": ariaInvalid,
	class: className = "",
	children: rootChildren = undefined,
	...rest
}: Props = $props();

const generatedId = $props.id();
const field = getFieldContext();
let resolvedControlId = $derived(id ?? field?.controlId ?? generatedId);
let resolvedDisabled = $derived(disabled ?? field?.disabled ?? false);
let resolvedRequired = $derived(required ?? field?.required ?? false);
let describedBy = $derived(mergeFieldIds(ariaDescribedBy, field?.describedBy));
let resolvedInvalid = $derived(ariaInvalid ?? (field?.invalid ? "true" : undefined));
let dateFormatter = $derived(
	new Intl.DateTimeFormat(locale, {
		day: "numeric",
		month: "long",
		timeZone: "UTC",
		year: "numeric",
	})
);

function toUtcDate(dateValue: DateValue): Date {
	if ("timeZone" in dateValue) return dateValue.toDate();
	return dateValue.toDate("UTC");
}

function formatDateValue(dateValue: DateValue | undefined): string {
	return dateValue ? dateFormatter.format(toUtcDate(dateValue)) : "";
}

let dateLabel = $derived(formatDateValue(value) || label);
</script>

<DatePickerPrimitive.Root
	bind:value
	bind:placeholder
	bind:open
	{locale}
	disabled={resolvedDisabled}
	required={resolvedRequired}
	{...rest}
>
	{#if rootChildren}
		{@render rootChildren()}
	{:else}
		<DatePickerPrimitive.Trigger
			id={resolvedControlId}
			data-slot="date-picker"
			class={cn("cn-date-picker", className)}
			aria-label={ariaLabel}
			aria-labelledby={ariaLabelledBy}
			aria-describedby={describedBy}
			aria-invalid={resolvedInvalid}
			aria-required={resolvedRequired ? "true" : undefined}
			disabled={resolvedDisabled}
		>
			<span class="cn-date-picker-icon" aria-hidden="true"></span>
			<span class="cn-date-picker-label">{dateLabel}</span>
		</DatePickerPrimitive.Trigger>
		<DatePickerPrimitive.Portal>
			<DatePickerPrimitive.Content data-slot="date-picker-popup" class="cn-date-picker-popup">
				<DatePickerPrimitive.Calendar data-slot="calendar" class="cn-calendar">
					{#snippet children({ months, weekdays })}
						<DatePickerPrimitive.Header data-slot="calendar-header" class="cn-calendar-header">
							<DatePickerPrimitive.PrevButton>
								{#snippet child({ props })}
									<button
										{...props}
										data-slot="calendar-prev-button"
										class="cn-calendar-nav-button"
										aria-label={previousMonthLabel}
									>
										<span
											class="cn-calendar-nav-icon cn-calendar-nav-icon-prev"
											aria-hidden="true"
										></span>
									</button>
								{/snippet}
							</DatePickerPrimitive.PrevButton>
							<DatePickerPrimitive.Heading data-slot="calendar-heading" class="cn-calendar-heading" />
							<DatePickerPrimitive.NextButton>
								{#snippet child({ props })}
									<button
										{...props}
										data-slot="calendar-next-button"
										class="cn-calendar-nav-button"
										aria-label={nextMonthLabel}
									>
										<span
											class="cn-calendar-nav-icon cn-calendar-nav-icon-next"
											aria-hidden="true"
										></span>
									</button>
								{/snippet}
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
