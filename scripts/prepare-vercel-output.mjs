import { cp, lstat, mkdir, opendir, readlink, rm, symlink } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "apps/www/.vercel/output");
const target = join(root, ".vercel/output");

async function rebaseInternalSymlinks(directory) {
	const entries = await opendir(directory);

	for await (const entry of entries) {
		const path = join(directory, entry.name);
		const stats = await lstat(path);

		if (stats.isDirectory()) {
			await rebaseInternalSymlinks(path);
			continue;
		}
		if (!stats.isSymbolicLink()) continue;

		const linkTarget = await readlink(path);
		if (!isAbsolute(linkTarget)) continue;
		if (!linkTarget.startsWith(`${source}${sep}`)) {
			throw new Error(`Cannot copy absolute symlink outside the Vercel artifact: ${path}`);
		}

		const copiedTarget = join(target, relative(source, linkTarget));
		await rm(path);
		await symlink(relative(dirname(path), copiedTarget), path);
	}
}

await rm(target, { force: true, recursive: true });
await mkdir(dirname(target), { recursive: true });
await cp(source, target, { recursive: true });
await rebaseInternalSymlinks(target);

console.log("Prepared the Vercel Build Output API artifact at .vercel/output.");
