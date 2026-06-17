import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const componentParts = {
	Alert: ["AlertAction", "AlertDescription", "AlertTitle"],
	Card: ["CardDescription", "CardFooter", "CardHeader", "CardPanel", "CardTitle"],
	Empty: ["EmptyContent", "EmptyDescription", "EmptyHeader", "EmptyMedia", "EmptyTitle"],
	Field: ["FieldDescription", "FieldError", "FieldLabel", "FieldValidity"],
	Fieldset: ["FieldsetLegend"],
	Frame: ["FrameDescription", "FrameFooter", "FrameHeader", "FramePanel", "FrameTitle"],
	InputGroup: ["InputGroupAddon", "InputGroupInput", "InputGroupText", "InputGroupTextarea"],
	Table: [
		"TableBody",
		"TableCaption",
		"TableCell",
		"TableFooter",
		"TableHead",
		"TableHeader",
		"TableRow",
	],
};

const defaultPreviewParts = {
	Alert: ["AlertDescription", "AlertTitle"],
	Card: ["CardDescription", "CardFooter", "CardHeader", "CardPanel", "CardTitle"],
	Empty: ["EmptyContent", "EmptyDescription", "EmptyHeader", "EmptyMedia", "EmptyTitle"],
	Field: ["FieldDescription", "FieldLabel"],
	Fieldset: ["FieldsetLegend"],
	Frame: ["FrameDescription", "FrameFooter", "FrameHeader", "FramePanel", "FrameTitle"],
	InputGroup: ["InputGroupAddon", "InputGroupInput"],
	Table: [
		"TableBody",
		"TableCaption",
		"TableCell",
		"TableFooter",
		"TableHead",
		"TableHeader",
		"TableRow",
	],
};

test("public package exports documented presentational and form subcomponents", async () => {
	const index = await readFile("packages/coss-svelte/src/index.js", "utf8");

	for (const [root, parts] of Object.entries(componentParts)) {
		for (const part of parts) {
			assert.match(index, new RegExp(`\\b${part}\\b`), `${root} exports ${part}`);
		}
	}
});

test("docs preview renderer uses canonical presentational and form subcomponents", async () => {
	const previewRenderer = await readFile(
		"apps/www/src/lib/components/docs/component-preview-renderer.svelte",
		"utf8"
	);

	for (const parts of Object.values(defaultPreviewParts)) {
		for (const part of parts) {
			assert.match(
				previewRenderer,
				new RegExp(`<${part}\\b`),
				`${part} is used in the docs preview renderer`
			);
		}
	}
});
