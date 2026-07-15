<script lang="ts">
import { Slider as SliderPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import type { PrimitiveAttributes } from "../internal/props.js";
import { cn } from "../utils.js";

type RootProps = ComponentProps<typeof SliderPrimitive.Root>;
type SingleRootProps = Extract<RootProps, { type: "single" }>;
type MultipleRootProps = Extract<RootProps, { type: "multiple" }>;
type SliderValue = NonNullable<SingleRootProps["value"]>;
type SliderChildProps = Parameters<NonNullable<SingleRootProps["children"]>>[0];
type SliderContentProps = Pick<SliderChildProps, "thumbItems" | "tickItems">;
type Props = PrimitiveAttributes & {
	type?: "single" | "multiple";
	value?: SliderValue | SliderValue[];
	min?: number;
	max?: number;
	step?: number;
	class?: string;
	children?: Snippet<[SliderContentProps]>;
	onValueChange?: (value: SliderValue | SliderValue[]) => void;
};

let {
	type = "single",
	value = $bindable(40),
	min = 0,
	max = 100,
	step = 1,
	class: className = "",
	children: rootChildren,
	onValueChange,
	...rest
}: Props = $props();
</script>

{#snippet content({ thumbItems, tickItems }: SliderContentProps)}
		{#if rootChildren}
			{@render rootChildren({ thumbItems, tickItems })}
		{:else}
			<SliderPrimitive.Range data-slot="slider-range" class="cn-slider-range" />
			{#each tickItems as tick}
				<SliderPrimitive.Tick data-slot="slider-tick" class="cn-slider-tick" index={tick.index} />
			{/each}
			{#each thumbItems as thumb}
				<SliderPrimitive.Thumb data-slot="slider-thumb" class="cn-slider-thumb" index={thumb.index} />
			{/each}
		{/if}
{/snippet}

{#if type === "multiple"}
	<SliderPrimitive.Root
		data-slot="slider"
		class={cn("cn-slider", className)}
		type="multiple"
		value={Array.isArray(value) ? value : [value]}
		min={min}
		max={max}
		step={step}
		onValueChange={(next) => {
			value = next;
			onValueChange?.(next);
		}}
		{...rest}
	>
		{#snippet children(props)}{@render content(props)}{/snippet}
	</SliderPrimitive.Root>
{:else}
	<SliderPrimitive.Root
		data-slot="slider"
		class={cn("cn-slider", className)}
		type="single"
		value={Array.isArray(value) ? value[0] ?? 0 : value}
		min={min}
		max={max}
		step={step}
		onValueChange={(next) => {
			value = next;
			onValueChange?.(next);
		}}
		{...rest}
	>
		{#snippet children(props)}{@render content(props)}{/snippet}
	</SliderPrimitive.Root>
{/if}
