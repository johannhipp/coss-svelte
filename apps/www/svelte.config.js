import cloudflareAdapter from "@sveltejs/adapter-cloudflare";
import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const deploymentAdapter = process.env.CF_DEPLOY === "1" ? cloudflareAdapter() : adapter();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: deploymentAdapter,
		files: {
			assets: "../registry/static",
		},
	},
};

export default config;
