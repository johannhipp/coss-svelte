import { fireEvent, render } from "@testing-library/svelte";
import { expect, test } from "vitest";
import Autocomplete from "../src/components/Autocomplete.svelte";

test("Autocomplete opens its suggestions when the fallback input receives focus", async () => {
	const { getByRole, getByText } = render(Autocomplete, {
		props: {
			options: ["Apple", "Banana"],
			placeholder: "Search items…",
		},
	});

	await fireEvent.focus(getByRole("combobox"));

	expect(getByText("Apple")).toBeVisible();
	expect(getByText("Banana")).toBeVisible();
});
