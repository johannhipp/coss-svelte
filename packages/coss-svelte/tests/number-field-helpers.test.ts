import { describe, expect, test } from "vitest";
import {
	alignNumberFieldValue,
	assertNumberFieldValue,
	clampNumberFieldValue,
	createNumberFieldLocale,
	formatBlurredNumber,
	formatFocusedNumber,
	isNumberFieldStepDisabled,
	isNumberFieldValueOutOfBounds,
	parseLocalizedNumberEdit,
	resolveNumberFieldFormat,
	stepNumberFieldValue,
	validateNumberFieldConfig,
} from "../src/internal/number-field.js";

describe("Number Field numeric helpers", () => {
	test("steps decimal values without floating point artifacts", () => {
		const config = validateNumberFieldConfig({ step: 0.1 });
		expect(stepNumberFieldValue(0.1, 1, config.step, config)).toBe(0.2);
		expect(stepNumberFieldValue(0.2, 1, config.step, config)).toBe(0.3);
		expect(stepNumberFieldValue(0.3, -1, config.step, config)).toBe(0.2);
	});

	test("uses min as the step grid and clamps at both bounds", () => {
		const config = validateNumberFieldConfig({ min: 0.25, max: 1, step: 0.25 });
		expect(stepNumberFieldValue(0.26, 1, config.step, config)).toBe(0.5);
		expect(stepNumberFieldValue(0.74, -1, config.step, config)).toBe(0.5);
		expect(stepNumberFieldValue(1, 1, config.step, config)).toBe(1);
		expect(stepNumberFieldValue(null, -1, config.step, config)).toBe(0.25);
		expect(alignNumberFieldValue(0.62, config.step, config)).toBe(0.5);
	});

	test("validates external values without silently clamping them", () => {
		expect(assertNumberFieldValue(12)).toBe(12);
		expect(clampNumberFieldValue(12, { min: 0, max: 10 })).toBe(10);
		expect(isNumberFieldValueOutOfBounds(12, { min: 0, max: 10 })).toBe(true);
		expect(isNumberFieldValueOutOfBounds(null, { min: 0, max: 10 })).toBe(false);
		expect(() => assertNumberFieldValue(Number.NaN)).toThrow(/finite number or null/);
		expect(() => validateNumberFieldConfig({ min: 2, max: 1 })).toThrow(/less than or equal/);
		expect(() => validateNumberFieldConfig({ step: 0 })).toThrow(/greater than zero/);
		expect(() => validateNumberFieldConfig({ smallStep: Number.POSITIVE_INFINITY })).toThrow(
			/finite number/
		);
	});

	test("derives directional disabled state", () => {
		const config = validateNumberFieldConfig({ min: 0, max: 2 });
		expect(isNumberFieldStepDisabled({ value: 2, direction: 1, amount: 1, config })).toBe(true);
		expect(isNumberFieldStepDisabled({ value: 1, direction: 1, amount: 1, config })).toBe(false);
		expect(
			isNumberFieldStepDisabled({
				value: 1,
				direction: -1,
				amount: 1,
				config,
				readonly: true,
			})
		).toBe(true);
	});
});

describe("Number Field locale helpers", () => {
	test("parses grouped and partial German edits", () => {
		const locale = createNumberFieldLocale("de-DE");
		expect(parseLocalizedNumberEdit("1.234,5", locale)).toEqual({
			kind: "number",
			value: 1234.5,
		});
		expect(parseLocalizedNumberEdit("-2,", locale)).toEqual({
			kind: "trailing-decimal",
			value: -2,
		});
		expect(parseLocalizedNumberEdit("-", locale)).toEqual({ kind: "sign" });
		expect(parseLocalizedNumberEdit("2,3,4", locale)).toEqual({ kind: "invalid" });
	});

	test("maps non-Latin digits and preserves deterministic formatting", () => {
		const locale = createNumberFieldLocale("ar-EG");
		expect(parseLocalizedNumberEdit("١٢٫٥", locale)).toEqual({
			kind: "number",
			value: 12.5,
		});
		expect(formatFocusedNumber(1234.5, "de-DE")).toBe("1234,5");
		expect(
			formatBlurredNumber(1234.5, "en-US", {
				style: "currency",
				currency: "USD",
			})
		).toBe("$1,234.50");
	});

	test("derives useful default precision and validates Intl options eagerly", () => {
		const config = validateNumberFieldConfig({
			step: 0.001,
			smallStep: 0.0001,
			largeStep: 1,
		});
		expect(resolveNumberFieldFormat("en-US", {}, config)).toMatchObject({
			maximumFractionDigits: 4,
		});
		expect(resolveNumberFieldFormat("de-DE", { minimumFractionDigits: 6 }, config)).toMatchObject({
			minimumFractionDigits: 6,
			maximumFractionDigits: 6,
		});
		expect(() =>
			resolveNumberFieldFormat(
				"de-DE",
				{ minimumFractionDigits: 3, maximumFractionDigits: 2 },
				config
			)
		).toThrow(/NumberField locale or format is invalid/);
		expect(() => resolveNumberFieldFormat("en-US", { style: "currency" }, config)).toThrow(
			/NumberField locale or format is invalid/
		);
		expect(() => resolveNumberFieldFormat("not_a_locale", {}, config)).toThrow(
			/NumberField locale or format is invalid/
		);
	});
});
