<script lang="ts">
import { Calendar as CalendarPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import type { PrimitiveAttributes } from "../internal/props.js";
import { cn } from "../utils.js";

type RootProps = ComponentProps<typeof CalendarPrimitive.Root>;
type SingleRootProps = Extract<RootProps, { type: "single" }>;
type MultipleRootProps = Extract<RootProps, { type: "multiple" }>;
type CalendarValue = NonNullable<SingleRootProps["value"]>;
type CalendarChildProps = Parameters<NonNullable<SingleRootProps["children"]>>[0];
type Props = PrimitiveAttributes & {
	type?: "single" | "multiple";
	value?: CalendarValue | CalendarValue[];
	class?: string;
	children?: Snippet<[CalendarChildProps]>;
	onValueChange?: (value: CalendarValue | CalendarValue[] | undefined) => void;
};

let {
	type = "single",
	value = $bindable(),
	class: className = "",
	children: rootChildren,
	onValueChange,
	...rest
}: Props = $props();
</script>

{#snippet content({ months, weekdays }: CalendarChildProps)}
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

{#if type === "multiple"}
	<CalendarPrimitive.Root
		data-slot="calendar"
		class={cn("cn-calendar", className)}
		type="multiple"
		value={Array.isArray(value) ? value : []}
		onValueChange={(next) => {
			value = next;
			onValueChange?.(next);
		}}
		{...rest}
	>
		{#snippet children(props)}{@render content(props)}{/snippet}
	</CalendarPrimitive.Root>
{:else}
	<CalendarPrimitive.Root
		data-slot="calendar"
		class={cn("cn-calendar", className)}
		type="single"
		value={Array.isArray(value) ? value[0] : value}
		onValueChange={(next) => {
			value = next;
			onValueChange?.(next);
		}}
		{...rest}
	>
		{#snippet children(props)}{@render content(props)}{/snippet}
	</CalendarPrimitive.Root>
{/if}
