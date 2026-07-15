import { hydrate } from "svelte";
import { expect, test } from "vitest";
import FieldHydrationFixture from "./FieldHydrationFixture.svelte";

test("Field hydration preserves server-generated control associations", () => {
	const target = document.createElement("div");
	target.innerHTML =
		'<!--[--><!--$s1--><div data-slot="field" data-invalid="true" class="cn-field"><!--[0--><div class="cn-field-label-row"><label class="cn-label" for="hydration-field-control" id="hydration-field-label">Email</label> <!--[0--><span class="cn-field-required" aria-hidden="true">*</span><!--]--></div><!--]--> <input data-slot="input" id="hydration-field-control" class="cn-input" type="text" required="" aria-describedby="hydration-field-description hydration-field-error" aria-invalid="true" data-invalid="true"/><!----> <p data-slot="field-description" class="cn-field-description" id="hydration-field-description">Use your work email.</p><p data-slot="field-error" id="hydration-field-error" class="cn-field-error" role="alert">Email is invalid</p><!--[-1--><!--]--><!--[-1--><!--]--></div><!--]-->';
	document.body.append(target);

	hydrate(FieldHydrationFixture, { target });
	const input = target.querySelector("input");
	expect(input?.id).toBe("hydration-field-control");
	expect(input?.getAttribute("aria-describedby")).toBe(
		"hydration-field-description hydration-field-error"
	);
});
