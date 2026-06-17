import assert from "node:assert/strict";
import { test } from "node:test";

import { validateCnClassMap } from "../scripts/validate-cn-classes.mjs";

test("every static cn-* source class has a theme rule", async () => {
	const result = await validateCnClassMap({ root: process.cwd() });

	assert.deepEqual(result.missing, [], `missing theme rules: ${result.missing.join(", ")}`);
	assert.ok(result.sourceClasses.length > 0, "source classes were discovered");
	assert.ok(result.themeClasses.length > 0, "theme classes were discovered");
});
