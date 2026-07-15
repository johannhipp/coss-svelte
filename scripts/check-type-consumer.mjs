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
	],
	{ cwd: join(root, "packages/coss-svelte"), stdio: "inherit" }
);

process.exitCode = result.status ?? 1;
