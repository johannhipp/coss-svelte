export const NUMBER_FIELD_PRESS_DELAY = 400;
export const NUMBER_FIELD_REPEAT_INTERVAL = 80;
export const NUMBER_FIELD_SCRUB_THRESHOLD = 8;
export const NUMBER_FIELD_MAX_PRECISION = 12;

export type NumberFieldReason =
	| "input"
	| "increment"
	| "decrement"
	| "keyboard"
	| "wheel"
	| "scrub"
	| "reset";

export type NumberFieldChangeDetails = Readonly<{
	reason: NumberFieldReason;
	previousValue: number | null;
	sourceEvent: Event | null;
}>;

export type NumberFieldDirection = -1 | 1;

export type NumberFieldConfig = Readonly<{
	min?: number;
	max?: number;
	step: number;
	smallStep: number;
	largeStep: number;
}>;

export type NumberFieldLocale = Readonly<{
	decimal: string;
	group?: string;
	minus: string;
	plus: string;
	digits: ReadonlyMap<string, string>;
}>;

export type ParsedNumberEdit =
	| { kind: "empty" }
	| { kind: "sign" }
	| { kind: "trailing-decimal"; value: number }
	| { kind: "number"; value: number }
	| { kind: "invalid" };

type NumberFieldConfigInput = Partial<NumberFieldConfig>;

function assertFiniteOption(name: string, value: number | undefined): void {
	if (value !== undefined && !Number.isFinite(value)) {
		throw new TypeError(`NumberField ${name} must be a finite number.`);
	}
}

function assertPositiveStep(name: string, value: number): void {
	if (!Number.isFinite(value) || value <= 0) {
		throw new TypeError(`NumberField ${name} must be a finite number greater than zero.`);
	}
}

export function validateNumberFieldConfig({
	min,
	max,
	step = 1,
	smallStep = 0.1,
	largeStep = 10,
}: NumberFieldConfigInput = {}): NumberFieldConfig {
	assertFiniteOption("min", min);
	assertFiniteOption("max", max);
	assertPositiveStep("step", step);
	assertPositiveStep("smallStep", smallStep);
	assertPositiveStep("largeStep", largeStep);

	if (min !== undefined && max !== undefined && min > max) {
		throw new TypeError("NumberField min must be less than or equal to max.");
	}

	return { min, max, step, smallStep, largeStep };
}

export function assertNumberFieldValue(value: number | null, name = "value"): number | null {
	if (value === null) return null;
	if (!Number.isFinite(value)) {
		throw new TypeError(`NumberField ${name} must be a finite number or null.`);
	}

	return value;
}

export function clampNumberFieldValue(
	value: number,
	{ min, max }: Pick<NumberFieldConfig, "min" | "max">
): number {
	return Math.min(
		max ?? Number.POSITIVE_INFINITY,
		Math.max(min ?? Number.NEGATIVE_INFINITY, value)
	);
}

export function isNumberFieldValueOutOfBounds(
	value: number | null,
	{ min, max }: Pick<NumberFieldConfig, "min" | "max">
): boolean {
	return (
		value !== null && ((min !== undefined && value < min) || (max !== undefined && value > max))
	);
}

export function decimalPrecision(value: number): number {
	const [coefficient, exponentSource] = value.toString().toLowerCase().split("e");
	const exponent = Number(exponentSource ?? 0);
	const fractionLength = coefficient.split(".")[1]?.length ?? 0;
	return Math.min(NUMBER_FIELD_MAX_PRECISION, Math.max(0, fractionLength - exponent));
}

function roundToPrecision(value: number, precision: number): number {
	if (!Number.isFinite(value)) return value;
	const scale = 10 ** Math.min(NUMBER_FIELD_MAX_PRECISION, Math.max(0, precision));
	return Math.round((value + Number.EPSILON * Math.sign(value || 1)) * scale) / scale;
}

function isGridAligned(quotient: number): boolean {
	const nearest = Math.round(quotient);
	const tolerance = Number.EPSILON * Math.max(1, Math.abs(quotient)) * 8;
	return Math.abs(quotient - nearest) <= tolerance;
}

export function alignNumberFieldValue(
	value: number,
	step: number,
	config: Pick<NumberFieldConfig, "min" | "max">
): number {
	const base = config.min ?? 0;
	const quotient = (value - base) / step;
	const precision = Math.max(
		decimalPrecision(base),
		decimalPrecision(step),
		decimalPrecision(value)
	);
	const aligned = roundToPrecision(base + Math.round(quotient) * step, precision);
	return clampNumberFieldValue(aligned, config);
}

export function stepNumberFieldValue(
	value: number | null,
	direction: NumberFieldDirection,
	amount: number,
	config: Pick<NumberFieldConfig, "min" | "max">
): number {
	assertPositiveStep("step amount", amount);
	const current = value ?? 0;
	const base = config.min ?? 0;
	const quotient = (current - base) / amount;
	const gridIndex = isGridAligned(quotient)
		? Math.round(quotient) + direction
		: direction > 0
			? Math.floor(quotient) + 1
			: Math.ceil(quotient) - 1;
	const precision = Math.max(
		decimalPrecision(current),
		decimalPrecision(base),
		decimalPrecision(amount)
	);
	const next = roundToPrecision(base + gridIndex * amount, precision);
	return clampNumberFieldValue(next, config);
}

export function isNumberFieldStepDisabled({
	value,
	direction,
	amount,
	config,
	disabled = false,
	readonly = false,
}: {
	value: number | null;
	direction: NumberFieldDirection;
	amount: number;
	config: Pick<NumberFieldConfig, "min" | "max">;
	disabled?: boolean;
	readonly?: boolean;
}): boolean {
	if (disabled || readonly) return true;
	if (value === null) return false;
	return Object.is(stepNumberFieldValue(value, direction, amount, config), value);
}

export function createNumberFieldLocale(locale: string | string[]): NumberFieldLocale {
	const plainFormatter = new Intl.NumberFormat(locale, {
		maximumFractionDigits: NUMBER_FIELD_MAX_PRECISION,
		useGrouping: false,
	});
	const groupedFormatter = new Intl.NumberFormat(locale);
	const signedFormatter = new Intl.NumberFormat(locale, {
		signDisplay: "always",
		useGrouping: false,
	});
	const sample = plainFormatter.formatToParts(-1.1);
	const group = groupedFormatter.formatToParts(10_000).find((part) => part.type === "group")?.value;
	const digits = new Map<string, string>();

	for (let digit = 0; digit <= 9; digit += 1) {
		const localizedDigit = plainFormatter
			.formatToParts(digit)
			.find((part) => part.type === "integer")?.value;
		if (localizedDigit) digits.set(localizedDigit, String(digit));
	}

	return {
		decimal: sample.find((part) => part.type === "decimal")?.value ?? ".",
		group,
		minus: sample.find((part) => part.type === "minusSign")?.value ?? "-",
		plus: signedFormatter.formatToParts(1).find((part) => part.type === "plusSign")?.value ?? "+",
		digits,
	};
}

function replaceAllLiteral(value: string, search: string | undefined, replacement: string): string {
	return search ? value.split(search).join(replacement) : value;
}

function normalizeLocalizedEdit(value: string, locale: NumberFieldLocale): string {
	let normalized = value.replace(/[\s\u00a0\u202f\u200e\u200f\u061c]/gu, "").normalize("NFKC");
	normalized = replaceAllLiteral(normalized, locale.group, "");
	normalized = replaceAllLiteral(normalized, locale.decimal, ".");
	normalized = replaceAllLiteral(normalized, locale.minus, "-");
	normalized = replaceAllLiteral(normalized, locale.plus, "+");

	for (const [localizedDigit, asciiDigit] of locale.digits) {
		normalized = replaceAllLiteral(normalized, localizedDigit, asciiDigit);
	}

	return normalized;
}

export function parseLocalizedNumberEdit(
	value: string,
	locale: NumberFieldLocale
): ParsedNumberEdit {
	const normalized = normalizeLocalizedEdit(value, locale);
	if (normalized === "") return { kind: "empty" };
	if (/^[+-]$/u.test(normalized) || /^[+-]?\.$/u.test(normalized)) {
		return { kind: "sign" };
	}
	if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/u.test(normalized)) {
		return { kind: "invalid" };
	}

	const parsed = Number(normalized);
	if (!Number.isFinite(parsed)) return { kind: "invalid" };
	if (normalized.endsWith(".")) return { kind: "trailing-decimal", value: parsed };
	return { kind: "number", value: parsed };
}

export function formatFocusedNumber(value: number | null, locale: string | string[]): string {
	if (value === null) return "";
	return new Intl.NumberFormat(locale, {
		maximumFractionDigits: NUMBER_FIELD_MAX_PRECISION,
		useGrouping: false,
	}).format(value);
}

export function formatBlurredNumber(
	value: number | null,
	locale: string | string[],
	format: Intl.NumberFormatOptions = {}
): string {
	if (value === null) return "";
	return new Intl.NumberFormat(locale, format).format(value);
}

export function resolveNumberFieldFormat(
	locale: string | string[],
	format: Intl.NumberFormatOptions,
	config: Pick<NumberFieldConfig, "step" | "smallStep" | "largeStep">
): Intl.NumberFormatOptions {
	const configuredPrecision = Math.max(
		decimalPrecision(config.step),
		decimalPrecision(config.smallStep),
		decimalPrecision(config.largeStep)
	);
	const defaultMaximumFractionDigits = Math.max(
		configuredPrecision,
		format.minimumFractionDigits ?? 0
	);
	const resolved =
		format.maximumFractionDigits === undefined
			? {
					...format,
					maximumFractionDigits: defaultMaximumFractionDigits,
				}
			: { ...format };

	try {
		new Intl.NumberFormat(locale, resolved);
		createNumberFieldLocale(locale);
	} catch (error) {
		const reason = error instanceof Error ? error.message : String(error);
		throw new TypeError(`NumberField locale or format is invalid: ${reason}`);
	}

	return resolved;
}

export function serializeInvariantNumber(value: number | null): string {
	return value === null ? "" : String(value);
}
