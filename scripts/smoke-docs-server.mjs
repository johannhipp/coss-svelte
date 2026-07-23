import { spawn } from "node:child_process";
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
	await request(`${baseUrl}/r/index.json`, "application/json");
	await request(`${baseUrl}/r/button.json`, "application/json");
	await request(`${baseUrl}/schema/registry-index.json`, "application/json");
	await request(`${baseUrl}/schema/registry-item.json`, "application/json");
	console.log("Docs production routes and registry assets are reachable.");
} finally {
	await stop(docsServer);
}
