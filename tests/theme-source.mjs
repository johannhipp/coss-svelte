import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function readThemeSource(root = process.cwd()) {
	const [tokens, components] = await Promise.all([
		readFile(join(root, "packages/theme/src/tokens.css"), "utf8"),
		readFile(join(root, "packages/theme/src/components.css"), "utf8"),
	]);
	const app = await readFile(join(root, "apps/www/src/app.css"), "utf8");
	return `${tokens}\n${components}\n${app}`;
}
