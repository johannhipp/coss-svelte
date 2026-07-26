import { render } from "@testing-library/svelte";
import { expect, test } from "vitest";
import Tooltip from "../src/components/Tooltip.svelte";

test("Tooltip convenience component provides the required tooltip context", () => {
	const { getByText } = render(Tooltip, {
		props: {
			label: "Hover for details",
			tip: "Helpful context",
		},
	});

	expect(getByText("Hover for details")).toBeInTheDocument();
});
