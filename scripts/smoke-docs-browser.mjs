import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import {
	componentFamilyGroups,
	runComponentFamilyCases,
} from "./browser/component-family-cases.mjs";
import { runDocsShellCases } from "./browser/docs-shell-cases.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = join(root, "apps/www");
const fixturePath = "/__test__/component-families";
const suites = new Set(["all", "docs", "components"]);

function parseArguments(arguments_) {
	let suite = "all";
	let family;

	for (let index = 0; index < arguments_.length; index += 1) {
		const argument = arguments_[index];
		if (argument === "--suite") {
			suite = arguments_[index + 1];
			index += 1;
			if (!suite || !suites.has(suite)) {
				throw new Error(
					`Unknown browser suite "${suite ?? ""}". Expected one of: ${[...suites].join(", ")}.`
				);
			}
			continue;
		}
		if (argument === "--family") {
			family = arguments_[index + 1];
			index += 1;
			if (!family || !(family in componentFamilyGroups)) {
				throw new Error(
					`Unknown component family "${family ?? ""}". Expected one of: ${Object.keys(
						componentFamilyGroups
					).join(", ")}.`
				);
			}
			continue;
		}
		throw new Error(`Unknown browser argument "${argument}". Use --suite or --family.`);
	}

	if (family && suite === "docs") {
		throw new Error("--family cannot be combined with --suite docs.");
	}
	if (family && suite === "all") suite = "components";
	return { family, suite };
}

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

async function startDocsServer(fixtureEnabled) {
	const port = await reservePort();
	const environment = { ...process.env, PORT: String(port) };
	if (fixtureEnabled) {
		environment.COSS_ENABLE_TEST_FIXTURES = "1";
	} else {
		delete environment.COSS_ENABLE_TEST_FIXTURES;
	}
	const child = spawn(process.execPath, ["build"], {
		cwd: docsRoot,
		env: environment,
		stdio: "inherit",
	});
	const baseUrl = `http://127.0.0.1:${port}`;
	await waitForServer(baseUrl, 20_000);
	return { baseUrl, child };
}

async function assertFixtureGuard() {
	const normalServer = await startDocsServer(false);
	try {
		const response = await fetch(`${normalServer.baseUrl}${fixturePath}`);
		if (response.status !== 404) {
			throw new Error(`The browser-only fixture returned ${response.status} without its guard.`);
		}
	} finally {
		await stop(normalServer.child);
	}
}

async function assertFixtureAnchors(baseUrl) {
	const response = await fetch(`${baseUrl}${fixturePath}`);
	if (!response.ok) {
		throw new Error(`The enabled browser fixture returned ${response.status}.`);
	}
	const html = await response.text();
	for (const anchor of [
		"component-family-fixture",
		"modal-family",
		"floating-family",
		"menu-family",
		"listbox-family",
		"choice-family",
		"disclosure-family",
		"date-range-family",
		"native-form-family",
		"managed-feedback-family",
		"action-family",
		"presentational-family",
		"selector-portal-host",
		"element-portal-host",
	]) {
		if (!html.includes(`data-testid="${anchor}"`)) {
			throw new Error(`The enabled browser fixture is missing ${anchor}.`);
		}
	}
}

let options;
try {
	options = parseArguments(process.argv.slice(2));
} catch (error) {
	console.error(error instanceof Error ? error.message : error);
	process.exit(2);
}

await assertFixtureGuard();
const docsServer = await startDocsServer(true);
let browser;

try {
	await assertFixtureAnchors(docsServer.baseUrl);
	browser = await chromium.launch();
	if (options.suite === "all" || options.suite === "docs") {
		await runDocsShellCases({ browser, baseUrl: docsServer.baseUrl });
	}
	if (options.suite === "all" || options.suite === "components") {
		await runComponentFamilyCases({
			browser,
			baseUrl: docsServer.baseUrl,
			family: options.family,
		});
	}
	console.log(
		`Browser smoke passed for ${options.family ? `component family ${options.family}` : `suite ${options.suite}`}.`
	);
} catch (error) {
	console.error(error);
	process.exitCode = 1;
} finally {
	await browser?.close();
	await stop(docsServer.child);
}
