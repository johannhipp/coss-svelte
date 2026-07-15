import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type DataAttributes = {
	[key: `data-${string}`]: string | null | undefined;
	[key: `aria-${string}`]: string | null | undefined;
};

export type PrimitiveAttributes = DataAttributes & {
	class?: string;
	id?: string;
	style?: string;
	role?: string;
	dir?: "ltr" | "rtl";
	tabindex?: number;
};

export type NativeProps<Element extends EventTarget = HTMLElement> = Omit<
	HTMLAttributes<Element>,
	"id"
> & {
	class?: string;
	id?: string;
	children?: Snippet;
};

export type Option =
	| string
	| {
			value?: string;
			label?: string;
			disabled?: boolean;
	  };

export type NormalizedOption = {
	value: string;
	label: string;
	disabled: boolean;
};

export function normalizeOption(option: Option): NormalizedOption {
	if (typeof option === "string") {
		return { value: option, label: option, disabled: false };
	}

	return {
		value: option.value ?? option.label ?? "",
		label: option.label ?? option.value ?? "",
		disabled: option.disabled ?? false,
	};
}

export function normalizeOptions(options: Option[]): NormalizedOption[] {
	return options.map(normalizeOption);
}

export function clampPercentage(value: number | null | undefined, min = 0, max = 100): number {
	if (value === null || value === undefined) return 100;
	if (!Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max) || max <= min) {
		return 0;
	}

	return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
}
