<script lang="ts">
import { Slider as SliderPrimitive } from "bits-ui";
import type { ComponentProps, Snippet } from "svelte";
import { cn } from "../utils.js";

type RootProps = ComponentProps<typeof SliderPrimitive.Root>;
type PrimitiveSingleProps = Extract<RootProps, { type: "single" }>;
type PrimitiveMultipleProps = Extract<RootProps, { type: "multiple" }>;
type SliderValue = NonNullable<PrimitiveSingleProps["value"]>;
type SliderChildProps = Parameters<NonNullable<PrimitiveSingleProps["children"]>>[0];
type ConvenienceProps = {
	class?: string;
	children?: Snippet<[SliderChildProps]>;
};
type SingleProps = Omit<
	PrimitiveSingleProps,
	"child" | "children" | "onValueChange" | "onValueCommit" | "type" | "value"
> &
	ConvenienceProps & {
		type?: "single";
		value?: SliderValue;
		onValueChange?: PrimitiveSingleProps["onValueChange"];
		onValueCommit?: PrimitiveSingleProps["onValueCommit"];
	};
type MultipleProps = Omit<
	PrimitiveMultipleProps,
	"child" | "children" | "onValueChange" | "onValueCommit" | "type" | "value"
> &
	ConvenienceProps & {
		type: "multiple";
		value?: SliderValue[];
		onValueChange?: PrimitiveMultipleProps["onValueChange"];
		onValueCommit?: PrimitiveMultipleProps["onValueCommit"];
	};
type Props = SingleProps | MultipleProps;

let { ref = $bindable(null), value = $bindable(), ...props }: Props = $props();
let thumbLabel = $derived(props["aria-label"] ?? "Value");

function singleValue(value: Props["value"]): SliderValue | undefined {
	if (value === undefined || typeof value === "number") return value;
	throw new TypeError('Slider type="single" requires a number value.');
}

function multipleValue(value: Props["value"]): SliderValue[] | undefined {
	if (value === undefined || Array.isArray(value)) return value;
	throw new TypeError('Slider type="multiple" requires a number[] value.');
}

function singleRootProps(props: Omit<SingleProps, "value">) {
	const {
		class: _class,
		children: _children,
		type: _type,
		onValueChange: _onValueChange,
		onValueCommit: _onValueCommit,
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
		onValueCommit: _onValueCommit,
		...rootProps
	} = props;
	return rootProps;
}
</script>

{#snippet content(sliderProps: SliderChildProps)}
		{#if props.children}
			{@render props.children(sliderProps)}
		{:else}
			<SliderPrimitive.Range data-slot="slider-range" class="cn-slider-range" />
			{#each sliderProps.thumbItems as thumb}
				<SliderPrimitive.Thumb
					data-slot="slider-thumb"
					class="cn-slider-thumb"
					index={thumb.index}
					aria-label={sliderProps.thumbItems.length > 1
						? `${thumbLabel} ${thumb.index + 1}`
						: thumbLabel}
				/>
			{/each}
		{/if}
{/snippet}

{#if props.type === "multiple"}
	<SliderPrimitive.Root
		bind:ref
		{...multipleRootProps(props)}
		data-slot="slider"
		class={cn("cn-slider", props.class)}
		type="multiple"
		value={multipleValue(value)}
		onValueChange={(next) => {
			value = next;
			props.onValueChange?.(next);
		}}
		onValueCommit={props.onValueCommit}
	>
		{#snippet children(props)}{@render content(props)}{/snippet}
	</SliderPrimitive.Root>
{:else}
	<SliderPrimitive.Root
		bind:ref
		{...singleRootProps(props)}
		data-slot="slider"
		class={cn("cn-slider", props.class)}
		type="single"
		value={singleValue(value)}
		onValueChange={(next) => {
			value = next;
			props.onValueChange?.(next);
		}}
		onValueCommit={props.onValueCommit}
	>
		{#snippet children(props)}{@render content(props)}{/snippet}
	</SliderPrimitive.Root>
{/if}
