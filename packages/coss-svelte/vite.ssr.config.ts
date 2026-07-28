import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [svelte()],
	resolve: {
		conditions: ["svelte", "node"],
	},
	test: {
		environment: "node",
		include: ["tests/*-ssr.test.ts"],
	},
});
