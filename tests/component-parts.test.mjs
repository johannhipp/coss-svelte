import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

import { componentMetadata, componentParts } from "../packages/coss-svelte/src/metadata.js";

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

	for (const [root, parts] of Object.entries(componentParts).filter(
		([, parts]) => parts.length > 0
	)) {
		for (const part of parts) {
			assert.match(index, new RegExp(`\\b${part}\\b`), `${root} exports ${part}`);
		}
	}
});

test("docs examples are canonical lazy entry points", async () => {
	const index = await readFile("apps/www/src/lib/examples/index.ts", "utf8");
	assert.match(index, /import\.meta\.glob\("\.\/\*\.svelte"\)/);

	for (const root of Object.keys(defaultPreviewParts)) {
		const source = await readFile(
			`apps/www/src/lib/examples/${componentMetadata[root].slug}.svelte`,
			"utf8"
		);
		assert.match(source, new RegExp(`import \\{[^}]*\\b${root}\\b[^}]*\\} from "coss-svelte"`));
	}
});
