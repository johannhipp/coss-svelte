import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "@playwright/test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = join(root, "apps/www");

function reservePort() {
	return new Promise((resolve, reject) => {
		const server = createServer();
		server.once("error", reject);
		server.listen(0, "127.0.0.1", () => {
			const address = server.address();
			if (!address || typeof address === "string") {
				reject(new Error("Unable to reserve a local port for browser smoke tests."));
				return;
			}
			server.close((error) => (error ? reject(error) : resolve(address.port)));
		});
	});
}

function delay(milliseconds) {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function waitForServer(baseUrl, timeoutMilliseconds) {
	const startedAt = Date.now();
	let lastError;

	while (Date.now() - startedAt < timeoutMilliseconds) {
		try {
			const response = await fetch(`${baseUrl}/docs/introduction`);
			if (response.ok) return;
			lastError = new Error(`received ${response.status}`);
		} catch (error) {
			lastError = error;
		}
		await delay(100);
	}

	throw new Error(`Docs server did not start: ${lastError?.message ?? "unknown error"}`);
}

async function stop(child) {
	if (child.exitCode !== null || child.signalCode !== null) return;
	child.kill("SIGTERM");
	await Promise.race([
		new Promise((resolve) => child.once("exit", resolve)),
		delay(5_000).then(() => child.kill("SIGKILL")),
	]);
}

const port = await reservePort();
const docsServer = spawn(process.execPath, ["build"], {
	cwd: docsRoot,
	env: { ...process.env, PORT: String(port) },
	stdio: "inherit",
});
const baseUrl = `http://127.0.0.1:${port}`;
let browser;

try {
	await waitForServer(baseUrl, 20_000);
	browser = await chromium.launch();
	const context = await browser.newContext();
	const page = await context.newPage();

	await page.goto(`${baseUrl}/docs/introduction`, { waitUntil: "networkidle" });
	await page.getByRole("heading", { name: "Introduction" }).waitFor();

	const toggle = page.getByRole("button", { name: /Switch to (dark|light) theme/ });
	const wasPressed = await toggle.getAttribute("aria-pressed");
	await toggle.click();
	await page.waitForFunction(
		(expected) => document.documentElement.classList.contains("dark") === expected,
		wasPressed !== "true"
	);

	await page.keyboard.press("ControlOrMeta+K");
	await page.locator("#docs-search-input").waitFor();
	await page.keyboard.press("Escape");
	await page.locator("#docs-search-input").waitFor({ state: "hidden" });

	const accessibility = await new AxeBuilder({ page })
		.withTags(["wcag2a", "wcag2aa", "wcag21aa"])
		.analyze();
	const blockingViolations = accessibility.violations.filter((violation) =>
		["critical", "serious"].includes(violation.impact)
	);
	if (blockingViolations.length > 0) {
		throw new Error(
			`Accessibility violations:\n${blockingViolations
				.map(
					(violation) =>
						`${violation.id}: ${violation.nodes.map((node) => node.target.join(", ")).join("; ")}`
				)
				.join("\n")}`
		);
	}

	console.log("Docs browser smoke and accessibility checks passed.");
} catch (error) {
	console.error(error);
	process.exitCode = 1;
} finally {
	await browser?.close();
	await stop(docsServer);
}
