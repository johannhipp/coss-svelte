<script lang="ts">
import { Calendar as CalendarPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type RootProps = ComponentProps<typeof CalendarPrimitive.Root>;
type PrimitiveSingleProps = Extract<RootProps, { type: "single" }>;
type PrimitiveMultipleProps = Extract<RootProps, { type: "multiple" }>;
type CalendarValue = NonNullable<PrimitiveSingleProps["value"]>;
type CalendarChildProps = Parameters<NonNullable<PrimitiveSingleProps["children"]>>[0];
type ConvenienceProps = {
	class?: string;
	children?: Snippet<[CalendarChildProps]>;
};
type SingleProps = Omit<
	PrimitiveSingleProps,
	"child" | "children" | "onValueChange" | "type" | "value"
> &
	ConvenienceProps & {
		type?: "single";
		value?: CalendarValue;
		onValueChange?: PrimitiveSingleProps["onValueChange"];
	};
type MultipleProps = Omit<
	PrimitiveMultipleProps,
	"child" | "children" | "onValueChange" | "type" | "value"
> &
	ConvenienceProps & {
		type: "multiple";
		value?: CalendarValue[];
		onValueChange?: PrimitiveMultipleProps["onValueChange"];
	};
type Props = SingleProps | MultipleProps;

let {
	ref = $bindable(null),
	value = $bindable(),
	placeholder = $bindable(),
	...props
}: Props = $props();

function singleValue(value: Props["value"]): CalendarValue | undefined {
	if (value === undefined || !Array.isArray(value)) return value;
	throw new TypeError('Calendar type="single" requires one DateValue.');
}

function multipleValue(value: Props["value"]): CalendarValue[] | undefined {
	if (value === undefined || Array.isArray(value)) return value;
	throw new TypeError('Calendar type="multiple" requires a DateValue[].');
}

function singleRootProps(props: Omit<SingleProps, "value">) {
	const {
		class: _class,
		children: _children,
		type: _type,
		onValueChange: _onValueChange,
		...rootProps
	} = props;
	return rootProps;
}

function multipleRootProps(props: Omit<MultipleProps, "value">) {
	const {
		class: _class,
		children: _children,
		type: _type,
		onValueChange: _onValueChange,
		...rootProps
	} = props;
	return rootProps;
}
</script>

{#snippet content({ months, weekdays }: CalendarChildProps)}
	{#if props.children}
		{@render props.children({ months, weekdays })}
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

{#if props.type === "multiple"}
	<CalendarPrimitive.Root
		bind:ref
		bind:placeholder
		{...multipleRootProps(props)}
		data-slot="calendar"
		class={cn("cn-calendar", props.class)}
		type="multiple"
		value={multipleValue(value)}
		onValueChange={(next) => {
			value = next;
			props.onValueChange?.(next);
		}}
	>
		{#snippet children(props)}{@render content(props)}{/snippet}
	</CalendarPrimitive.Root>
{:else}
	<CalendarPrimitive.Root
		bind:ref
		bind:placeholder
		{...singleRootProps(props)}
		data-slot="calendar"
		class={cn("cn-calendar", props.class)}
		type="single"
		value={singleValue(value)}
		onValueChange={(next) => {
			value = next;
			props.onValueChange?.(next);
		}}
	>
		{#snippet children(props)}{@render content(props)}{/snippet}
	</CalendarPrimitive.Root>
{/if}
