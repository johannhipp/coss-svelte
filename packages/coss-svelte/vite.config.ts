import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [svelte()],
	resolve: {
		conditions: ["browser"],
	},
	test: {
		environment: "jsdom",
		include: ["tests/**/*.test.ts"],
		exclude: ["tests/field-ssr.test.ts"],
		setupFiles: ["tests/setup.ts"],
	},
});
