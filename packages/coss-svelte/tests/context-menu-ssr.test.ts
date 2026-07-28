import { render as renderSSR } from "svelte/server";
import { expect, test } from "vitest";
import ContextMenuSsrFixture from "./ContextMenuSsrFixture.svelte";

test("[ssr:context-menu] imports and renders closed trigger targets", () => {
	const { body } = renderSSR(ContextMenuSsrFixture);

	expect(body).toContain('id="server-context-target"');
	expect(body).toContain('data-slot="context-menu-trigger"');
	expect(body).toContain("Server context target");
	expect(body).toContain("Second context target");
	expect(body).not.toContain('data-slot="context-menu-popup"');

	const generatedIds = [...body.matchAll(/id="([^"]+)"[^>]+data-context-menu-trigger/gu)].map(
		(match) => match[1]
	);
	expect(generatedIds).toHaveLength(2);
	expect(new Set(generatedIds).size).toBe(generatedIds.length);
	expect(generatedIds[1]).not.toBe("server-context-target");
});
