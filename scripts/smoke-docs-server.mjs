import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { createServer } from "node:net";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = join(root, "apps/www");

function reservePort() {
	return new Promise((resolve, reject) => {
		const server = createServer();
		server.once("error", reject);
		server.listen(0, "127.0.0.1", () => {
			const address = server.address();
			if (!address || typeof address === "string") {
				reject(new Error("Unable to reserve a local port for docs smoke tests."));
				return;
			}
			server.close((error) => (error ? reject(error) : resolve(address.port)));
		});
	});
}

function delay(milliseconds) {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function request(url, expectedContentType) {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`${url} returned ${response.status}.`);
	if (expectedContentType && !response.headers.get("content-type")?.includes(expectedContentType)) {
		throw new Error(`${url} did not return ${expectedContentType}.`);
	}
	return response.text();
}

function normalize(source) {
	return source.replace(/\r\n/g, "\n").trimEnd();
}

async function crawlComponentRoutes(baseUrl, registryIndex) {
	const failures = [];
	let nextIndex = 0;

	async function worker() {
		while (nextIndex < registryIndex.items.length) {
			const item = registryIndex.items[nextIndex];
			nextIndex += 1;
			const slug = item.meta.slug;

			try {
				const [html, markdown, source] = await Promise.all([
					request(`${baseUrl}/docs/components/${slug}`, "text/html"),
					request(`${baseUrl}/docs/components/${slug}.md`, "text/plain"),
					readFile(join(docsRoot, "src/lib/examples", `${slug}.svelte`), "utf8"),
				]);

				for (const expected of [
					`data-preview-slug="${slug}"`,
					">Preview<",
					">Code<",
					'aria-label="Copy code"',
				]) {
					if (!html.includes(expected)) {
						throw new Error(`HTML is missing ${expected}`);
					}
				}
				for (const forbidden of [
					"This component is not implemented yet",
					"No local example is available",
					"could not be loaded",
				]) {
					if (html.includes(forbidden)) {
						throw new Error(`HTML contains forbidden preview copy: ${forbidden}`);
					}
				}
				if (!normalize(markdown).includes(normalize(source))) {
					throw new Error("Markdown does not contain the executable Svelte source");
				}
			} catch (error) {
				failures.push(`${slug}: ${error instanceof Error ? error.message : String(error)}`);
			}
		}
	}

	await Promise.all(
		Array.from({ length: Math.min(6, registryIndex.items.length) }, () => worker())
	);

	if (failures.length > 0) {
		throw new Error(
			`Component route crawl failed:\n${failures.map((item) => `- ${item}`).join("\n")}`
		);
	}
}

async function waitForServer(baseUrl, timeoutMilliseconds) {
	const startedAt = Date.now();
	let lastError;

	while (Date.now() - startedAt < timeoutMilliseconds) {
		try {
			await request(`${baseUrl}/docs/introduction`, "text/html");
			return;
		} catch (error) {
			lastError = error;
			await delay(100);
		}
	}

	throw new Error(`Docs server did not start: ${lastError?.message ?? "unknown error"}`);
}

async function stop(process) {
	if (process.exitCode !== null || process.signalCode !== null) return;
	process.kill("SIGTERM");
	await Promise.race([
		new Promise((resolve) => process.once("exit", resolve)),
		delay(5_000).then(() => process.kill("SIGKILL")),
	]);
}

const port = await reservePort();
const docsServer = spawn(process.execPath, ["build"], {
	cwd: docsRoot,
	env: { ...process.env, PORT: String(port) },
	stdio: "inherit",
});
const baseUrl = `http://127.0.0.1:${port}`;

try {
	await waitForServer(baseUrl, 20_000);
	await request(`${baseUrl}/llms.txt`, "text/plain");
	const registryIndex = JSON.parse(await request(`${baseUrl}/r/index.json`, "application/json"));
	await request(`${baseUrl}/r/button.json`, "application/json");
	await request(`${baseUrl}/schema/registry-index.json`, "application/json");
	await request(`${baseUrl}/schema/registry-item.json`, "application/json");

	const componentIndexResponse = await fetch(`${baseUrl}/docs/components`);
	if (componentIndexResponse.status !== 404) {
		throw new Error(
			`Removed aggregate component route returned ${componentIndexResponse.status} instead of 404.`
		);
	}

	await crawlComponentRoutes(baseUrl, registryIndex);

	console.log(
		`Docs production crawl passed for ${registryIndex.items.length} HTML and markdown component routes.`
	);
} finally {
	await stop(docsServer);
}
