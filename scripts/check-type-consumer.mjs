import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const result = spawnSync(
	"pnpm",
	[
		"exec",
		"tsc",
		"--noEmit",
		"--strict",
		"--skipLibCheck",
		"--module",
		"ESNext",
		"--moduleResolution",
		"Bundler",
		"--target",
		"ES2022",
		"--ignoreConfig",
		"tests/type-consumer.ts",
		"tests/types/type-contracts.ts",
	],
	{ cwd: join(root, "packages/coss-svelte"), stdio: "inherit" }
);

if (result.status !== 0) {
	process.exitCode = result.status ?? 1;
} else {
	const svelteResult = spawnSync(
		"pnpm",
		[
			"exec",
			"svelte-check",
			"--workspace",
			"tests/types",
			"--tsconfig",
			"./tsconfig.json",
			"--fail-on-warnings",
		],
		{ cwd: join(root, "packages/coss-svelte"), stdio: "inherit" }
	);
	process.exitCode = svelteResult.status ?? 1;
}
