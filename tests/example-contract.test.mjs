import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { componentMetadata } from "../packages/coss-svelte/src/metadata.js";

const repositoryRoot = fileURLToPath(new URL("..", import.meta.url));
const examplesDirectory = path.join(repositoryRoot, "apps/www/src/lib/examples");
const exampleIndex = await readFile(path.join(examplesDirectory, "index.ts"), "utf8");
const sourceReader = await readFile(path.join(examplesDirectory, "source.server.ts"), "utf8");
const particleLoader = await readFile(
	path.join(repositoryRoot, "apps/www/src/routes/particles/+page.js"),
	"utf8"
);

function normalize(source) {
	return source.replace(/\r\n/g, "\n").trimEnd();
}

test("each implemented root has one executable example and deferred roots have none", async () => {
	const files = new Set(
		(await readdir(examplesDirectory)).filter((file) => file.endsWith(".svelte"))
	);
	for (const metadata of Object.values(componentMetadata)) {
		const filename = `${metadata.slug}.svelte`;
		if (metadata.status === "deferred") {
			assert.equal(files.has(filename), false, `${metadata.slug} must remain deferred`);
			continue;
		}
		assert.equal(files.has(filename), true, `missing example for ${metadata.slug}`);
		const source = await readFile(path.join(examplesDirectory, filename), "utf8");
		assert.match(
			source,
			new RegExp(`import \\{[^}]*\\b${metadata.name}\\b[^}]*\\} from "coss-svelte"`)
		);
		assert.doesNotMatch(source, /from ["'][^"']*packages\/coss-svelte/);
		assert.doesNotMatch(source, /<script[^>]*>[\s\S]*export\s+default/);
	}
	assert.equal(files.size, 53);
});

test("the lazy manifest and server source contract cover the same slugs", async () => {
	assert.match(exampleIndex, /import\.meta\.glob\("\.\/\*\.svelte"\)/);
	assert.match(sourceReader, /readFile\(new URL\(`\$\{metadata\.slug\}\.svelte`/);
	for (const metadata of Object.values(componentMetadata).filter(
		(item) => item.status !== "deferred"
	)) {
		const source = await readFile(path.join(examplesDirectory, `${metadata.slug}.svelte`), "utf8");
		assert.ok(normalize(source).length > 0, metadata.slug);
	}
});

test("particles use local examples and installable local registry items", () => {
	assert.doesNotMatch(particleLoader, /coss\.com\/ui\/r/);
	assert.match(particleLoader, /registryUrl: `\/r\/\$\{component\.slug\}\.json`/);
});

test("the old duplicated preview source is removed", async () => {
	await assert.rejects(
		access(path.join(repositoryRoot, "apps/www/src/lib/docs/preview-examples.js")),
		(error) => error?.code === "ENOENT"
	);
});
