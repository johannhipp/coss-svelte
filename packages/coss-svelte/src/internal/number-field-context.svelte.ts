import { getContext, setContext } from "svelte";
import {
	alignNumberFieldValue,
	createNumberFieldLocale,
	formatBlurredNumber,
	formatFocusedNumber,
	isNumberFieldStepDisabled,
	type NumberFieldConfig,
	type NumberFieldDirection,
	type NumberFieldReason,
	normalizeNumberFieldValue,
	parseLocalizedNumberEdit,
	stepNumberFieldValue,
} from "./number-field.js";

export type NumberFieldSize = "sm" | "md" | "lg";

export type NumberFieldState = Readonly<{
	value: number | null;
	config: NumberFieldConfig;
	editValue: string;
	formattedValue: string;
	focused: boolean;
	parseInvalid: boolean;
	invalid: boolean;
	required: boolean;
	disabled: boolean;
	readonly: boolean;
	allowWheelScrub: boolean;
	inputId: string;
	label?: string;
	size: NumberFieldSize;
	form?: string;
	describedBy?: string;
	inputElement: HTMLInputElement | null;
	incrementDisabled: boolean;
	decrementDisabled: boolean;
	beginEdit: () => void;
	endEdit: () => void;
	updateEdit: (value: string) => void;
	commitEdit: (reason?: NumberFieldReason) => void;
	cancelEdit: () => void;
	adjust: (direction: NumberFieldDirection, amount: number, reason: NumberFieldReason) => boolean;
	adjustByUnits: (units: number, amount: number, reason: NumberFieldReason) => boolean;
	setToBound: (bound: "min" | "max", reason: NumberFieldReason) => boolean;
	commit: (reason: NumberFieldReason) => void;
	reset: (value: number | null) => void;
	setInputElement: (element: HTMLInputElement | null) => void;
}>;

type NumberFieldStateOptions = {
	getValue: () => number | null;
	setValue: (value: number | null) => void;
	getConfig: () => NumberFieldConfig;
	getLocale: () => string | string[];
	getFormat: () => Intl.NumberFormatOptions;
	getInputId: () => string;
	getLabel: () => string | undefined;
	getSize: () => NumberFieldSize;
	getForm: () => string | undefined;
	getRequired: () => boolean;
	getDisabled: () => boolean;
	getReadonly: () => boolean;
	getInvalid: () => boolean;
	getAllowWheelScrub: () => boolean;
	getDescribedBy: () => string | undefined;
	getOnValueChange: () => ((value: number | null, reason: NumberFieldReason) => void) | undefined;
	getOnValueCommit: () => ((value: number | null, reason: NumberFieldReason) => void) | undefined;
};

const numberFieldContextKey = Symbol("coss-svelte-number-field");

export function createNumberFieldState(options: NumberFieldStateOptions): NumberFieldState {
	const initialConfig = options.getConfig();
	const initialValue = normalizeNumberFieldValue(options.getValue(), initialConfig);
	if (!Object.is(initialValue, options.getValue())) options.setValue(initialValue);

	let editValue = $state(
		formatBlurredNumber(initialValue, options.getLocale(), options.getFormat())
	);
	let focused = $state(false);
	let parseInvalid = $state(false);
	let inputElement = $state<HTMLInputElement | null>(null);

	function displayValue(value: number | null, editing = focused): string {
		return editing
			? formatFocusedNumber(value, options.getLocale())
			: formatBlurredNumber(value, options.getLocale(), options.getFormat());
	}

	function emitValue(value: number | null, reason: NumberFieldReason, force = false): boolean {
		const changed = !Object.is(options.getValue(), value);
		if (changed) options.setValue(value);
		if (changed || force) options.getOnValueChange()?.(value, reason);
		return changed;
	}

	function normalizeParsedValue(value: number): number {
		const normalized = normalizeNumberFieldValue(value, options.getConfig());
		if (normalized === null) {
			throw new TypeError("NumberField parsed numeric values cannot normalize to null.");
		}
		return normalized;
	}

	function beginEdit(): void {
		if (options.getDisabled()) return;
		focused = true;
		parseInvalid = false;
		editValue = displayValue(options.getValue(), true);
	}

	function updateEdit(value: string): void {
		editValue = value;
		const parsed = parseLocalizedNumberEdit(value, createNumberFieldLocale(options.getLocale()));
		parseInvalid = parsed.kind === "invalid";

		if (parsed.kind === "empty") {
			emitValue(null, "input");
			return;
		}

		if (parsed.kind === "number" || parsed.kind === "trailing-decimal") {
			emitValue(normalizeParsedValue(parsed.value), "input");
		}
	}

	function commitEdit(reason: NumberFieldReason = "input"): void {
		const parsed = parseLocalizedNumberEdit(
			editValue,
			createNumberFieldLocale(options.getLocale())
		);

		if (parsed.kind === "invalid" || parsed.kind === "sign") {
			parseInvalid = true;
			editValue = displayValue(options.getValue(), false);
			options.getOnValueCommit()?.(options.getValue(), reason);
			return;
		}

		if (parsed.kind === "empty") {
			parseInvalid = false;
			emitValue(null, reason);
			editValue = "";
			options.getOnValueCommit()?.(null, reason);
			return;
		}

		const config = options.getConfig();
		const normalized = normalizeParsedValue(parsed.value);
		const aligned = alignNumberFieldValue(normalized, config.step, config);
		parseInvalid = false;
		emitValue(aligned, reason);
		editValue = displayValue(aligned, false);
		options.getOnValueCommit()?.(aligned, reason);
	}

	function endEdit(): void {
		commitEdit("input");
		focused = false;
	}

	function cancelEdit(): void {
		parseInvalid = false;
		editValue = displayValue(options.getValue(), true);
	}

	function adjust(
		direction: NumberFieldDirection,
		amount: number,
		reason: NumberFieldReason
	): boolean {
		if (options.getDisabled() || options.getReadonly()) return false;
		const next = stepNumberFieldValue(options.getValue(), direction, amount, options.getConfig());
		parseInvalid = false;
		const changed = emitValue(next, reason);
		editValue = displayValue(next);
		return changed;
	}

	function adjustByUnits(units: number, amount: number, reason: NumberFieldReason): boolean {
		const direction: NumberFieldDirection = units < 0 ? -1 : 1;
		let changed = false;
		for (let unit = 0; unit < Math.abs(units); unit += 1) {
			changed = adjust(direction, amount, reason) || changed;
		}
		return changed;
	}

	function setToBound(bound: "min" | "max", reason: NumberFieldReason): boolean {
		if (options.getDisabled() || options.getReadonly()) return false;
		const next = options.getConfig()[bound];
		if (next === undefined) return false;
		parseInvalid = false;
		const changed = emitValue(next, reason);
		editValue = displayValue(next);
		return changed;
	}

	function commit(reason: NumberFieldReason): void {
		options.getOnValueCommit()?.(options.getValue(), reason);
	}

	function reset(value: number | null): void {
		const config = options.getConfig();
		const normalized = normalizeNumberFieldValue(value, config);
		const aligned =
			normalized === null ? null : alignNumberFieldValue(normalized, config.step, config);
		parseInvalid = false;
		focused = false;
		emitValue(aligned, "reset", true);
		editValue = displayValue(aligned, false);
		options.getOnValueCommit()?.(aligned, "reset");
	}

	function syncExternal(): void {
		const normalized = normalizeNumberFieldValue(options.getValue(), options.getConfig());
		if (!Object.is(normalized, options.getValue())) options.setValue(normalized);
		if (!focused) {
			const nextDisplay = displayValue(normalized, false);
			if (editValue !== nextDisplay) editValue = nextDisplay;
		}
	}

	$effect(syncExternal);
	$effect(() => {
		inputElement?.setCustomValidity(
			parseInvalid ? "Enter a valid number using the current locale." : ""
		);
	});

	return {
		get value() {
			return options.getValue();
		},
		get config() {
			return options.getConfig();
		},
		get editValue() {
			return editValue;
		},
		get formattedValue() {
			return displayValue(options.getValue(), false);
		},
		get focused() {
			return focused;
		},
		get parseInvalid() {
			return parseInvalid;
		},
		get invalid() {
			return options.getInvalid() || parseInvalid;
		},
		get required() {
			return options.getRequired();
		},
		get disabled() {
			return options.getDisabled();
		},
		get readonly() {
			return options.getReadonly();
		},
		get allowWheelScrub() {
			return options.getAllowWheelScrub();
		},
		get inputId() {
			return options.getInputId();
		},
		get label() {
			return options.getLabel();
		},
		get size() {
			return options.getSize();
		},
		get form() {
			return options.getForm();
		},
		get describedBy() {
			return options.getDescribedBy();
		},
		get inputElement() {
			return inputElement;
		},
		get incrementDisabled() {
			return isNumberFieldStepDisabled({
				value: options.getValue(),
				direction: 1,
				amount: options.getConfig().step,
				config: options.getConfig(),
				disabled: options.getDisabled(),
				readonly: options.getReadonly(),
			});
		},
		get decrementDisabled() {
			return isNumberFieldStepDisabled({
				value: options.getValue(),
				direction: -1,
				amount: options.getConfig().step,
				config: options.getConfig(),
				disabled: options.getDisabled(),
				readonly: options.getReadonly(),
			});
		},
		beginEdit,
		endEdit,
		updateEdit,
		commitEdit,
		cancelEdit,
		adjust,
		adjustByUnits,
		setToBound,
		commit,
		reset,
		setInputElement(element) {
			inputElement = element;
		},
	};
}

export function setNumberFieldContext(context: NumberFieldState): void {
	setContext(numberFieldContextKey, context);
}

export function getNumberFieldContext(): NumberFieldState {
	const context = getContext<NumberFieldState | undefined>(numberFieldContextKey);
	if (!context) {
		throw new Error("Number Field parts must be rendered inside <NumberField>.");
	}
	return context;
}
