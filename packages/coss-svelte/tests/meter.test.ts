import { render } from "@testing-library/svelte";
import { expect, test } from "vitest";
import MeterFixture from "./MeterFixture.svelte";

test("MeterValue reads and formats the root meter percentage", () => {
	const { getByText } = render(MeterFixture);

	expect(getByText("75%")).toBeVisible();
});
