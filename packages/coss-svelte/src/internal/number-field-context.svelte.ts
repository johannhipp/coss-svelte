import { getContext, setContext } from "svelte";
import {
	assertNumberFieldValue,
	clampNumberFieldValue,
	createNumberFieldLocale,
	formatBlurredNumber,
	formatFocusedNumber,
	isNumberFieldStepDisabled,
	isNumberFieldValueOutOfBounds,
	type NumberFieldChangeDetails,
	type NumberFieldConfig,
	type NumberFieldDirection,
	type NumberFieldReason,
	parseLocalizedNumberEdit,
	stepNumberFieldValue,
} from "./number-field.js";

export type NumberFieldSize = "sm" | "default" | "lg";

export type NumberFieldState = Readonly<{
	value: number | null;
	config: NumberFieldConfig;
	editValue: string;
	formattedValue: string;
	focused: boolean;
	parseInvalid: boolean;
	validationMessage: string;
	invalid: boolean;
	required: boolean;
	disabled: boolean;
	readonly: boolean;
	allowWheelScrub: boolean;
	inputId: string;
	label?: string;
	hasFieldLabel: boolean;
	hasScrubArea: boolean;
	size: NumberFieldSize;
	form?: string;
	describedBy?: string;
	inputElement: HTMLInputElement | null;
	incrementDisabled: boolean;
	decrementDisabled: boolean;
	beginEdit: () => void;
	endEdit: (sourceEvent: Event | null) => void;
	updateEdit: (value: string, sourceEvent: Event | null) => void;
	commitEdit: (reason: NumberFieldReason, sourceEvent: Event | null) => boolean;
	cancelEdit: () => boolean;
	adjust: (
		direction: NumberFieldDirection,
		amount: number,
		reason: NumberFieldReason,
		sourceEvent: Event | null
	) => boolean;
	adjustByUnits: (
		units: number,
		amount: number,
		reason: NumberFieldReason,
		sourceEvent: Event | null
	) => boolean;
	setToBound: (
		bound: "min" | "max",
		reason: NumberFieldReason,
		sourceEvent: Event | null
	) => boolean;
	commit: (
		reason: NumberFieldReason,
		previousValue: number | null,
		sourceEvent: Event | null
	) => boolean;
	reset: (value: number | null, sourceEvent: Event | null) => void;
	registerScrubArea: () => () => void;
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
	getHasFieldLabel: () => boolean;
	getSize: () => NumberFieldSize;
	getForm: () => string | undefined;
	getRequired: () => boolean;
	getDisabled: () => boolean;
	getReadonly: () => boolean;
	getInvalid: () => boolean;
	getAllowWheelScrub: () => boolean;
	getDescribedBy: () => string | undefined;
	getOnValueChange: () =>
		| ((value: number | null, details: NumberFieldChangeDetails) => void)
		| undefined;
	getOnValueCommit: () =>
		| ((value: number | null, details: NumberFieldChangeDetails) => void)
		| undefined;
};

const numberFieldContextKey = Symbol("coss-svelte-number-field");

function localeKey(locale: string | string[]): string {
	return JSON.stringify(Array.isArray(locale) ? locale : [locale]);
}

export function createNumberFieldState(options: NumberFieldStateOptions): NumberFieldState {
	const initialValue = assertNumberFieldValue(options.getValue());
	let editValue = $state(
		formatBlurredNumber(initialValue, options.getLocale(), options.getFormat())
	);
	let focused = $state(false);
	let parseInvalid = $state(false);
	let inputElement = $state<HTMLInputElement | null>(null);
	let scrubAreaCount = $state(0);
	let focusStartValue = initialValue;
	let observedValue = initialValue;
	let editLocale = options.getLocale();
	let observedLocaleKey = localeKey(editLocale);

	function displayValue(value: number | null, editing = focused): string {
		return editing
			? formatFocusedNumber(value, options.getLocale())
			: formatBlurredNumber(value, options.getLocale(), options.getFormat());
	}

	function details(
		reason: NumberFieldReason,
		previousValue: number | null,
		sourceEvent: Event | null
	): NumberFieldChangeDetails {
		return { reason, previousValue, sourceEvent };
	}

	function emitValue(
		nextValue: number | null,
		reason: NumberFieldReason,
		sourceEvent: Event | null
	): boolean {
		assertNumberFieldValue(nextValue);
		const previousValue = options.getValue();
		if (Object.is(previousValue, nextValue)) return false;

		observedValue = nextValue;
		options.setValue(nextValue);
		options.getOnValueChange()?.(nextValue, details(reason, previousValue, sourceEvent));
		return true;
	}

	function beginEdit(): void {
		if (options.getDisabled() || options.getReadonly() || focused) return;
		focused = true;
		parseInvalid = false;
		focusStartValue = options.getValue();
		editLocale = options.getLocale();
		editValue = displayValue(options.getValue(), true);
	}

	function updateEdit(value: string, sourceEvent: Event | null): void {
		editValue = value;
		editLocale = options.getLocale();
		const parsed = parseLocalizedNumberEdit(value, createNumberFieldLocale(editLocale));
		parseInvalid = parsed.kind === "invalid" || parsed.kind === "sign";

		if (parsed.kind === "empty") {
			emitValue(null, "input", sourceEvent);
			return;
		}

		if (parsed.kind === "number" || parsed.kind === "trailing-decimal") {
			emitValue(parsed.value, "input", sourceEvent);
		}
	}

	function commit(
		reason: NumberFieldReason,
		previousValue: number | null,
		sourceEvent: Event | null
	): boolean {
		const value = options.getValue();
		if (Object.is(previousValue, value)) return false;
		options.getOnValueCommit()?.(value, details(reason, previousValue, sourceEvent));
		if (focused) focusStartValue = value;
		return true;
	}

	function commitEdit(reason: NumberFieldReason, sourceEvent: Event | null): boolean {
		if (!focused) return false;
		const parsed = parseLocalizedNumberEdit(editValue, createNumberFieldLocale(editLocale));

		if (parsed.kind === "number" || parsed.kind === "trailing-decimal") {
			emitValue(clampNumberFieldValue(parsed.value, options.getConfig()), reason, sourceEvent);
		} else if (parsed.kind === "empty") {
			emitValue(null, reason, sourceEvent);
		}

		parseInvalid = false;
		editLocale = options.getLocale();
		editValue = displayValue(options.getValue(), true);
		const committed = commit(reason, focusStartValue, sourceEvent);
		focusStartValue = options.getValue();
		return committed;
	}

	function endEdit(sourceEvent: Event | null): void {
		if (!focused) return;
		commitEdit("input", sourceEvent);
		focused = false;
		editValue = displayValue(options.getValue(), false);
	}

	function cancelEdit(): boolean {
		if (!focused) return false;
		const nextValue = displayValue(options.getValue(), true);
		const changed = parseInvalid || editValue !== nextValue;
		parseInvalid = false;
		editLocale = options.getLocale();
		editValue = nextValue;
		return changed;
	}

	function adjust(
		direction: NumberFieldDirection,
		amount: number,
		reason: NumberFieldReason,
		sourceEvent: Event | null
	): boolean {
		if (options.getDisabled() || options.getReadonly()) return false;
		const next = stepNumberFieldValue(options.getValue(), direction, amount, options.getConfig());
		parseInvalid = false;
		const changed = emitValue(next, reason, sourceEvent);
		editLocale = options.getLocale();
		editValue = displayValue(next);
		return changed;
	}

	function adjustByUnits(
		units: number,
		amount: number,
		reason: NumberFieldReason,
		sourceEvent: Event | null
	): boolean {
		if (units === 0) return false;
		const direction: NumberFieldDirection = units < 0 ? -1 : 1;
		let changed = false;
		for (let unit = 0; unit < Math.abs(units); unit += 1) {
			changed = adjust(direction, amount, reason, sourceEvent) || changed;
		}
		return changed;
	}

	function setToBound(
		bound: "min" | "max",
		reason: NumberFieldReason,
		sourceEvent: Event | null
	): boolean {
		if (options.getDisabled() || options.getReadonly()) return false;
		const next = options.getConfig()[bound];
		if (next === undefined) return false;
		parseInvalid = false;
		const changed = emitValue(next, reason, sourceEvent);
		editLocale = options.getLocale();
		editValue = displayValue(next);
		return changed;
	}

	function reset(value: number | null, sourceEvent: Event | null): void {
		const next = assertNumberFieldValue(value, "defaultValue");
		const previousValue = options.getValue();
		parseInvalid = false;
		focused = false;
		editLocale = options.getLocale();
		const changed = emitValue(next, "reset", sourceEvent);
		editValue = displayValue(next, false);
		if (changed) commit("reset", previousValue, sourceEvent);
		focusStartValue = next;
	}

	$effect(() => {
		const value = assertNumberFieldValue(options.getValue());
		if (Object.is(value, observedValue)) return;

		observedValue = value;
		focusStartValue = value;
		if (focused) {
			const parsed = parseLocalizedNumberEdit(editValue, createNumberFieldLocale(editLocale));
			const equivalent =
				(parsed.kind === "empty" && value === null) ||
				((parsed.kind === "number" || parsed.kind === "trailing-decimal") &&
					Object.is(parsed.value, value));
			if (!equivalent) {
				parseInvalid = false;
				editLocale = options.getLocale();
				editValue = displayValue(value, true);
			}
		} else {
			parseInvalid = false;
			editLocale = options.getLocale();
			editValue = displayValue(value, false);
		}
	});

	$effect(() => {
		const nextLocale = options.getLocale();
		const nextLocaleKey = localeKey(nextLocale);
		options.getConfig();
		options.getFormat();

		if (nextLocaleKey !== observedLocaleKey) {
			if (focused) {
				const parsed = parseLocalizedNumberEdit(editValue, createNumberFieldLocale(editLocale));
				if (
					parsed.kind === "empty" ||
					parsed.kind === "number" ||
					parsed.kind === "trailing-decimal"
				) {
					editLocale = nextLocale;
					editValue = displayValue(options.getValue(), true);
				}
			} else {
				editLocale = nextLocale;
				editValue = displayValue(options.getValue(), false);
			}
			observedLocaleKey = nextLocaleKey;
		} else if (!focused) {
			editValue = displayValue(options.getValue(), false);
		}
	});

	$effect(() => {
		inputElement?.setCustomValidity(validationMessage());
	});

	function validationMessage(): string {
		if (options.getDisabled() || options.getReadonly()) return "";
		if (parseInvalid) return "Enter a valid number using the current locale.";
		const value = options.getValue();
		if (options.getRequired() && value === null) return "Enter a number.";
		const { min, max } = options.getConfig();
		if (value !== null && min !== undefined && value < min) {
			return `Value must be greater than or equal to ${min}.`;
		}
		if (value !== null && max !== undefined && value > max) {
			return `Value must be less than or equal to ${max}.`;
		}
		return "";
	}

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
		get validationMessage() {
			return validationMessage();
		},
		get invalid() {
			return (
				options.getInvalid() ||
				parseInvalid ||
				(!options.getDisabled() &&
					!options.getReadonly() &&
					((options.getRequired() && options.getValue() === null) ||
						isNumberFieldValueOutOfBounds(options.getValue(), options.getConfig())))
			);
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
		get hasFieldLabel() {
			return options.getHasFieldLabel();
		},
		get hasScrubArea() {
			return scrubAreaCount > 0;
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
		registerScrubArea() {
			scrubAreaCount += 1;
			let registered = true;
			return () => {
				if (!registered) return;
				registered = false;
				scrubAreaCount -= 1;
			};
		},
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
