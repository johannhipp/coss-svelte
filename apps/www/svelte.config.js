import adapter from "@sveltejs/adapter-node";
import vercelAdapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const deploymentAdapter = process.env.VERCEL === "1" ? vercelAdapter() : adapter();

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
