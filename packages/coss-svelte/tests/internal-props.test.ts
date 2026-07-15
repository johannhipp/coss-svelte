import { expect, test } from "vitest";
import { clampPercentage, normalizeOption, normalizeOptions } from "../src/internal/props.js";

test("normalizeOption preserves string and object option contracts", () => {
	expect(normalizeOption("Draft")).toEqual({ value: "Draft", label: "Draft", disabled: false });
	expect(normalizeOption({ value: "published", disabled: true })).toEqual({
		value: "published",
		label: "published",
		disabled: true,
	});
	expect(normalizeOption({ label: "Needs review" })).toEqual({
		value: "Needs review",
		label: "Needs review",
		disabled: false,
	});
});

test("normalizeOptions applies the same option contract to a collection", () => {
	expect(normalizeOptions(["Draft", { value: "published", label: "Published" }])).toEqual([
		{ value: "Draft", label: "Draft", disabled: false },
		{ value: "published", label: "Published", disabled: false },
	]);
});

test("clampPercentage handles bounds, custom ranges, and invalid ranges", () => {
	expect(clampPercentage(50)).toBe(50);
	expect(clampPercentage(-10)).toBe(0);
	expect(clampPercentage(110)).toBe(100);
	expect(clampPercentage(25, 20, 40)).toBe(25);
	expect(clampPercentage(null)).toBe(100);
	expect(clampPercentage(Number.NaN)).toBe(0);
	expect(clampPercentage(50, 10, 10)).toBe(0);
});
